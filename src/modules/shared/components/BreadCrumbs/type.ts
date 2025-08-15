export interface ILink {
  link_name: string;
  link_to: string;
}

export interface IBreadCrumbsProps {
  loading: boolean;
  links: ILink[];
}
