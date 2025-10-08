import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import { useGetGroupQuery, type Group } from 'services';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddOrEditMatch from './AddOrEditMatch';
import MatchRow from './MatchRow';

function Matches({
  matches,
  teams,
  isFinal,
}: {
  matches: Group['matches'],
  teams: Group['teams'],
  isFinal: boolean
}) {
  const { groupId } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const [matchSelected, setMatchSelected] = useState<Group['matches'][number] | null>(null);

  const [type, setType] = useState<'add' | 'edit'>('add');

  const [isExtra, setExtra] = useState(false);

  const {
    data: extraData,
    isLoading: isLoadingExtra,
  } = useGetGroupQuery({
    groupId: Number(groupId),
    type: 'extra',
  }, { skip: !isFinal });

  const extraMatches = extraData?.matches;

  const extraTeams = extraData?.teams;

  const handleEditMatch = (match: Group['matches'][number], extra: boolean) => {
    setMatchSelected(match);
    setType('edit');
    setIsOpen(true);
    setExtra(extra);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <Typography variant="h6">
          Сыгранные матчи
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setType('add');
            setIsOpen(true);
            setExtra(false);
          }}
        >
          Добавить матч
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {matches && matches.length > 0 ? matches.map((match) => (
          <MatchRow
            key={match.id}
            match={match}
            teams={teams}
            onEdit={(itemMatch) => handleEditMatch(itemMatch, false)}
          />
        )) : (
          <Typography color="text.secondary">
            Нет сыгранных матчей в группе
          </Typography>
        )}
      </Box>

      {isFinal && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            mb={2}
            mt={5}
          >
            <Typography variant="h6">
              Сыгранные матчи в нижней части плей-офф
            </Typography>

            <Button
              variant="contained"
              color="primary"
              loading={isLoadingExtra}
              onClick={() => {
                setType('add');
                setIsOpen(true);
                setExtra(true);
              }}
            >
              Добавить матч
            </Button>
          </Box>

          {isLoadingExtra
            ? <CircularProgress />
            : (
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
              >
                {extraMatches && extraMatches.length > 0 ? extraMatches.map((match) => (
                  <MatchRow
                    key={match.id}
                    match={match}
                    teams={extraTeams ?? []}
                    onEdit={(itemMatch) => handleEditMatch(itemMatch, true)}
                  />
                )) : (
                  <Typography color="text.secondary">
                    Нет сыгранных матчей в нижней части плей-офф
                  </Typography>
                )}
              </Box>
            )}
        </>
      )}

      <AddOrEditMatch
        open={isOpen}
        onClose={() => setIsOpen(false)}
        match={matchSelected}
        type={type}
        teams={isExtra
          ? extraTeams ?? []
          : teams ?? []}
        isFinal={isFinal}
        isExtra={isExtra}
      />
    </>
  );
}

export default Matches;
