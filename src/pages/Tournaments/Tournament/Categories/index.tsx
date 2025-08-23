import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import type { Tournament } from 'services';
import AddCategory from './AddCategory';

function Categories({
  categories,
  stageId,
  categoryId,
  setCategoryId,
  subcategoryId,
  setSubcategoryId,
}: {
  categories: Tournament['categories'],
  stageId: number,
  categoryId: number | null,
  setCategoryId: (categoryId: number | null) => void,
  subcategoryId: number | null,
  setSubcategoryId: (subcategoryId: number | null) => void,
}) {
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  const [isSubcategory, setIsSubcategory] = useState(false);

  const parentCategories = categories.filter(
    (category) => category.stageId === stageId && !category.parentCategoryId,
  );

  const subCategories = categories.filter(
    (category) => category.stageId === stageId && category.parentCategoryId === categoryId,
  );

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 1,
      }}
      >
        <Typography variant="h6">
          Лиги
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddCategoryOpen(true)}
        >
          Добавить лигу
        </Button>
      </Box>

      <Box>
        {parentCategories.length > 0 ? (
          <>
            <Tabs
              sx={{ mb: 2 }}
              value={categoryId ?? false}
              onChange={(_, value) => setCategoryId(value)}
            >
              {parentCategories.map((category) => (
                <Tab
                  key={category.id}
                  value={category.id}
                  label={category.name}
                  sx={{ textTransform: 'none' }}
                />
              ))}
            </Tabs>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 1,
            }}
            >
              <Typography variant="h6">
                Подкатегории лиги
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsSubcategory(true);
                  setAddCategoryOpen(true);
                }}
              >
                Добавить подкатегорию
              </Button>
            </Box>

            {subCategories.length > 0 ? (
              <Tabs
                sx={{ mb: 2 }}
                value={subcategoryId ?? false}
                onChange={(_, value) => setSubcategoryId(value)}
              >
                {subCategories.map((category) => (
                  <Tab
                    key={category.id}
                    value={category.id}
                    label={category.name}
                    sx={{ textTransform: 'none' }}
                  />
                ))}
              </Tabs>
            ) : (
              <Typography color="text.secondary" variant="body1">
                В лиге нет подкатегорий
              </Typography>
            )}
          </>
        ) : (
          <Typography color="text.secondary" variant="body1">
            В этапе нет лиг
          </Typography>
        )}
      </Box>

      <AddCategory
        open={addCategoryOpen}
        onClose={() => setAddCategoryOpen(false)}
        stageId={stageId}
        parentCategoryId={isSubcategory ? categoryId : null}
      />
    </>
  );
}

export default Categories;
