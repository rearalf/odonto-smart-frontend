import { Breadcrumbs, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router';

const BreadCrumbs = (props: IBreadCrumbsProps) =>
  !props.loading ? (
    <Breadcrumbs aria-label="breadcrumb">
      {props.links.length > 0 ? (
        props.links.map((link, index) =>
          index === props.links.length - 1 ? (
            <Typography sx={{ color: 'text.primary' }} key={link.link_name}>
              {link.link_name}
            </Typography>
          ) : (
            <Link to={link.link_to} key={link.link_to}>
              {link.link_name}
            </Link>
          ),
        )
      ) : (
        <Typography sx={{ color: 'text.primary' }}>Dashboard</Typography>
      )}
    </Breadcrumbs>
  ) : (
    <Skeleton
      width={200}
      variant="text"
      animation="wave"
      className="breadCrumbs"
    />
  );

export default BreadCrumbs;
