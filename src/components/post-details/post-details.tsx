import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timeline from "timelinejs-react";
import { PostModel } from "../../models/export";
import { PostServices } from "../../services/export";
import { postActions } from "../../store/actions/export";
import { useAppDispatch } from "../../store/app/hooks";
import { CategoryState, PostState } from "../../store/slice/export";
import { PostToTilteSlideMapping } from "../../utils/mapping";

type Props = {
  categoryState: CategoryState;
  postState: PostState;
};

const PostDetailComponent: React.FC<Props> = (props) => {
  let navigate = useNavigate();
  let { postState, categoryState } = props;
  const dispatch = useAppDispatch();
  let allPost = postState.listAllPost;
  let events: TitleSlide[] = [];
  let userId = localStorage.getItem("USER_ID");

  function initialData() {
    if (allPost) {
       allPost?.forEach((post: PostModel) => {
         let tileSlide = PostToTilteSlideMapping(post);
         events.push(tileSlide);
       });
    }
  }

  // inital data for timeline
  initialData();

  let description = document.querySelector('meta[name="description"]');
  let iconPage = document.querySelector("link[rel~='icon']");
  let urlPage = document.querySelector("meta[property~='og:url']");
  let imagePage = document.querySelector("meta[property~='og:image']");
  
  const handleTimelineClick = (e: any) => {
    let element = e.target;
    const myInterval = setInterval(() => {
      element = element?.parentElement;
      if (element?.classList.contains("tl-slide")) {
        clearInterval(myInterval);
        PostServices.getPostByID(String(element.id), String(userId))
          .then(async (res) => {
            // dispatch(postActions.setContent(await res.data.Data.Content));
            let response: PostModel = await res.data.Data;
            dispatch(postActions.setPostSelected(response));
            navigate(`/${response.PostUrl}`);
            document.title = response.Title;
            description?.setAttribute("content", response.Title);
            iconPage?.setAttribute(
              "href",
              response.Image
                ? response.Image
                : "./assets/image/rada-animate.svg"
            );
            urlPage?.setAttribute(
              "content",
              window.location.protocol +
                "/" +
                window.location.host +
                "/" +
                window.location.pathname +
                window.location.search
            );
            imagePage?.setAttribute(
              "content",
              response.Image
                ? response.Image
                : "./assets/image/rada-animate.svg"
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 1);
  };

  return (
    <>
      {events.length > 0 ? (
        <div style={{ height: "40vh" }}>
          <Timeline
            target={
              <div
                onClick={(e) => handleTimelineClick(e)}
                className="timeline-test"
                style={{ width: "100%", height: 500 }}
              />
            }
            events={events}
            options={{
              timenav_position: "top",
              hash_bookmark: true,
              initial_zoom: 1,
              scale_factor: 1,
              debug: true,
              default_bg_color: { r: 0, g: 0, b: 0 },
            }} // optional
          />
        </div>
      ) : events.length === 0 ? (
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center fs-1 loading"
          style={{ height: "100vh" }}
        >
          No Post
        </div>
      ) : (
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center fs-1 loading"
          style={{ height: "100vh" }}
        >
          Loading...
        </div>
      )}
    </>
  );
};

export default PostDetailComponent;
