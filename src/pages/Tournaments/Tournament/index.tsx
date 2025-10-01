import {
  Box,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { BackButton } from 'components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetTournamentQuery } from 'services';
import { useEffect, useState } from 'react';
import Stages from './Stages';
import Categories from './Categories';
import Groups from './Groups';
import CategoryTeam from './CategoryTeam';

function Tournament() {
  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);

  const stageIdQuery = searchParams.get('stageId');

  const categoryIdQuery = searchParams.get('categoryId');

  const subcategoryIdQuery = searchParams.get('subcategoryId');

  const groupIdQuery = searchParams.get('groupId');

  const [data, setData] = useState({
    stageId: stageIdQuery ? Number(stageIdQuery) : null,
    categoryId: categoryIdQuery ? Number(categoryIdQuery) : null,
    subcategoryId: subcategoryIdQuery ? Number(subcategoryIdQuery) : null,
    groupId: groupIdQuery ? Number(groupIdQuery) : null,
  });

  const { id } = useParams();

  const { data: tournament, isLoading, isError } = useGetTournamentQuery(Number(id));

  const currentStage = tournament?.stages.find((stage) => stage.id === data.stageId);

  useEffect(() => {
    if (data.stageId !== null) {
      searchParams.set('stageId', data.stageId.toString());
    } else {
      searchParams.delete('stageId');
    }

    if (data.categoryId !== null) {
      searchParams.set('categoryId', data.categoryId.toString());
    } else {
      searchParams.delete('categoryId');
    }

    if (data.subcategoryId !== null) {
      searchParams.set('subcategoryId', data.subcategoryId.toString());
    } else {
      searchParams.delete('subcategoryId');
    }

    if (data.groupId !== null) {
      searchParams.set('groupId', data.groupId.toString());
    } else {
      searchParams.delete('groupId');
    }

    navigate(`${pathname}?${searchParams.toString()}`);
  }, [data]);

  const changeStage = (selectedStageId: number | null) => {
    setData((prev) => ({
      ...prev,
      stageId: selectedStageId,
    }));
  };

  const changeCategory = (selectedCategoryId: number | null) => {
    setData((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
    }));
  };

  const changeSubcategory = (selectedSubcategoryId: number | null) => {
    setData((prev) => ({
      ...prev,
      subcategoryId: selectedSubcategoryId,
    }));
  };

  const category = data.subcategoryId ?? data.categoryId;

  if (isError) {
    return <Box>Ошибка при загрузке турнира</Box>;
  }

  return (
    <>
      <Box mb={3}>
        <BackButton url="/tournaments" />
      </Box>

      {isLoading
        ? <CircularProgress />
        : (
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {tournament?.tournament?.name}
              {' '}
              -
              {' '}
              {tournament?.tournament?.isActive ? 'Активен' : 'Неактивен'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Stages
                activeStageId={tournament?.tournament?.currentStageId ?? null}
                stages={tournament?.stages ?? []}
                stageId={data.stageId}
                setStageId={changeStage}
              />
            </Box>

            {data.stageId && (
              <Box mb={3}>
                <Categories
                  categories={tournament?.categories ?? []}
                  stageId={data.stageId}
                  categoryId={data.categoryId}
                  setCategoryId={changeCategory}
                  subcategoryId={data.subcategoryId}
                  setSubcategoryId={changeSubcategory}
                />
              </Box>
            )}

            {data.stageId && (
              <Box mb={3}>
                <Groups
                  groups={tournament?.groups ?? []}
                  stageId={data.stageId}
                  categoryId={data.categoryId}
                  subcategoryId={data.subcategoryId}
                  isFinal={currentStage?.isFinal ?? false}
                />
              </Box>
            )}

            {currentStage?.isFinal && category && (
              <Box mb={3}>
                <CategoryTeam categoryId={category} />
              </Box>
            )}
          </Box>
        )}
    </>
  );
}

export default Tournament;
