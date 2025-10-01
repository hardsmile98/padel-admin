import {
  Box,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { BackButton } from 'components';
import { useParams } from 'react-router-dom';
import { useGetGroupQuery } from 'services';
import Teams from './Teams';
import Matches from './Matches';

function Group() {
  const { groupId } = useParams();

  const { data, isLoading, isError } = useGetGroupQuery(Number(groupId));

  const stage = data?.stage;

  const isFinal = stage?.isFinal;

  if (isError) {
    return <Box>Ошибка при загрузке группы</Box>;
  }

  return (
    <>
      <Box mb={3}>
        <BackButton />
      </Box>

      {isLoading
        ? <CircularProgress />
        : (
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {data?.group?.name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {!isFinal && (
              <>
                <Box mb={3}>
                  <Teams teams={data?.teams || []} />
                </Box>

                <Divider sx={{ my: 2 }} />
              </>
            )}

            <Box>
              <Matches
                matches={data?.matches || []}
                teams={data?.teams || []}
              />
            </Box>
          </Box>
        )}
    </>
  );
}

export default Group;
