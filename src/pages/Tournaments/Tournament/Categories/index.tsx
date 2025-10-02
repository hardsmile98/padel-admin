import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { Tournament } from 'services';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';

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

  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);
  const [type, setType] = useState<'parent' | 'sub'>('parent');

  const [isSubcategory, setIsSubcategory] = useState(false);

  const parentCategories = categories.filter(
    (category) => category.stageId === stageId && !category.parentCategoryId,
  );

  const subCategories = categories.filter(
    (category) => categoryId !== null
      && category.stageId === stageId
      && category.parentCategoryId === categoryId,
  );

  useEffect(() => {
    if (parentCategories.length > 0) {
      const categoryFinded = parentCategories.find((category) => category.id === categoryId);

      if (!categoryId || categoryFinded === undefined) {
        setCategoryId(parentCategories[0].id);
      }
    } else if (categoryId) {
      setCategoryId(null);
    }
  }, [stageId, categories, categoryId]);

  useEffect(() => {
    if (subCategories.length > 0) {
      const subcategoryFinded = subCategories.find((category) => category.id === subcategoryId);

      if (!subcategoryId || subcategoryFinded === undefined) {
        setSubcategoryId(subCategories[0].id);
      }
    } else if (subcategoryId) {
      setSubcategoryId(null);
    }
  }, [stageId, subCategories, subcategoryId]);

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

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsSubcategory(false);
              setAddCategoryOpen(true);
            }}
          >
            Добавить лигу
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={parentCategories.length === 0}
            onClick={() => {
              setType('parent');
              setDeleteCategoryOpen(true);
            }}
          >
            Удалить лигу
          </Button>
        </Box>
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

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
              }}
              >
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

                <Button
                  variant="contained"
                  color="error"
                  disabled={subCategories.length === 0}
                  onClick={() => {
                    setType('sub');
                    setDeleteCategoryOpen(true);
                  }}
                >
                  Удалить подкатегорию
                </Button>
              </Box>
            </Box>

            {categoryId && subCategories.length > 0 ? (
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

      <DeleteCategory
        open={deleteCategoryOpen}
        onClose={() => setDeleteCategoryOpen(false)}
        categories={type === 'parent' ? parentCategories : subCategories}
      />
    </>
  );
}

export default Categories;
