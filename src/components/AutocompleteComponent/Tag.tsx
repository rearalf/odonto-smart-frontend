import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';
import {
  Chip,
  alpha,
  type Theme,
  type AutocompleteRenderGetTagProps,
} from '@mui/material';

const Tag = (
  value: IAutocompleteOption[],
  getTagProps: AutocompleteRenderGetTagProps,
  theme: Theme,
) => {
  return value.map((option, index) => {
    const { key, ...chipProps } = getTagProps({ index });
    return (
      <Chip
        key={key}
        variant="outlined"
        label={option.label}
        size="small"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderColor: alpha(theme.palette.primary.main, 0.3),
          color: theme.palette.primary.main,
          fontWeight: 500,
          '& .MuiChip-deleteIcon': {
            color: alpha(theme.palette.primary.main, 0.8),
            '&:hover': {
              color: theme.palette.primary.main,
            },
          },
        }}
        {...chipProps}
      />
    );
  });
};

export default Tag;
