import StaticImageData from "next/types";
export enum GameTypeEnum {
  "SINGLE",
  "ONLINE",
  "PRIVATE",
}

export interface GameCardType {
  title: string;
  imgSrc: any;
}
