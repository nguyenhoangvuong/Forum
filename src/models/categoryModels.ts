export class CategoryModel {
  _id: string;
  Name: string;
  CatUrl: string;
  Image: string;
  CategoryParentId: string;
  Order: number;
  MetaTitle: string;
  MetaDescription: string;
  MetaKeyWords: string;
  KeyWords: string;
  Status: number;

  constructor(
    id: string = "",
    name: string = "",
    catUrl: string = "",
    image: string = "",
    categoryParentId: string = "",
    order: number = 1,
    metaTitle: string = "",
    metaDescription: string = "",
    metaKeyWords: string = "",
    keyWords: string = "",
    status: number = 1
  ) {
    this._id = id;
    this.Name = name;
    this.CatUrl = catUrl;
    this.Image = image;
    this.CategoryParentId = categoryParentId;
    this.Order = order;
    this.MetaTitle = metaTitle;
    this.MetaDescription = metaDescription;
    this.MetaKeyWords = metaKeyWords;
    this.KeyWords = keyWords;
    this.Status = status;
  }
}

export class CategoryFetchModel {
  CategoryParentId: string;

  constructor(CategoryParentId: string) {
    this.CategoryParentId = CategoryParentId;
  }
}

export class CreateUpdateCategory {
  CategoryId: string;
  Name: string;
  Image: string;
  CategoryParentId: string;
  Order: number;
  MetaTitle: string;
  MetaDescription: string;
  MetaKeyWords: string;
  KeyWords: string;
  Status: number;

  constructor(
    categoryId: string = "",
    name: string = "",
    image: string = "",
    categoryParentId: string = "",
    order: number = 1,
    metaTitle: string = "",
    metaDescription: string = "",
    metaKeyWords: string = "",
    keyWords: string = "",
    status: number = 1
  ) {
    this.CategoryId = categoryId;
    this.Name = name;
    this.Image = image;
    this.CategoryParentId = categoryParentId;
    this.Order = order;
    this.MetaTitle = metaTitle;
    this.MetaDescription = metaDescription;
    this.MetaKeyWords = metaKeyWords;
    this.KeyWords = keyWords;
    this.Status = status;
  }
}
