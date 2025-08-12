import {
  Breadcrumbs,
  Skeleton,
  Typography,
  Box,
  useTheme,
  alpha,
} from '@mui/material';
import { MdNavigateNext } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router';

import type { IBreadCrumbsProps } from './type';

const BreadCrumbs = ({ loading, links }: IBreadCrumbsProps) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
        <Skeleton width={80} height={24} variant="rounded" animation="wave" />
        <MdNavigateNext fontSize="small" color="disabled" />
        <Skeleton width={120} height={24} variant="rounded" animation="wave" />
        <MdNavigateNext fontSize="small" color="disabled" />
        <Skeleton width={100} height={24} variant="rounded" animation="wave" />
      </Box>
    );
  }

  return (
    <Breadcrumbs
      component="div"
      aria-label="breadcrumb"
      separator={
        <MdNavigateNext
          size={16}
          style={{ color: theme.palette.text.secondary }}
        />
      }
      sx={{
        '& .MuiBreadcrumbs-separator': {
          mx: 1,
        },
      }}
    >
      {links.length > 0 ? (
        links.map((link, index) => {
          const isLast = index === links.length - 1;

          if (isLast) {
            return (
              <Box
                component="span"
                key={link.link_name}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  px: 1,
                  py: 0.5,
                  color: '#fff',
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.primary.main, 1),
                }}
              >
                {link.link_name}
              </Box>
            );
          }

          return (
            <Link
              to={link.link_to}
              key={link.link_to}
              style={{ textDecoration: 'none' }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {index === 0 && (
                  <AiOutlineHome size={16} style={{ marginRight: '4px' }} />
                )}
                {link.link_name}
              </Box>
            </Link>
          );
        })
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <AiOutlineHome
            size={16}
            style={{ color: theme.palette.primary.main }}
          />
          <Typography
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Dashboard
          </Typography>
        </Box>
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
