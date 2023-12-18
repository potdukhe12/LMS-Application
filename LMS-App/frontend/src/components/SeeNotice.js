import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import NoticeTile2 from './NoticeTile2';
import { Box } from '@mui/material';

const SeeNotice = () => {
  const dispatch = useDispatch();

  const { currentUser, currentRole } = useSelector(state => state.user);
  const { noticesList, loading, error, response } = useSelector(state => state.notice);

  useEffect(() => {
    if (currentRole === 'Admin') {
      dispatch(getAllNotices(currentUser._id, 'Notice'));
    } else {
      dispatch(getAllNotices(currentUser.school._id, 'Notice'));
    }
  }, [dispatch, currentRole, currentUser]);

  if (error) {
    console.log(error);
  }

  // Filter notices to exclude expired ones and sort by date
  const filteredNotices = noticesList
    .filter(notice => new Date(notice.date) >= new Date().setHours(0, 0, 0, 0)) // Filter from the current date onwards
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <div style={{ marginTop: '20px', marginBottom: '100px', display: 'flex', flexWrap: 'wrap' }}>
      {loading ? (
        <div style={{ fontSize: '20px' }}>Loading...</div>
      ) : response ? (
        <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <Box
            sx={{
              width: '100%',
              overflow: 'hidden',
              marginBottom: '20px',
              fontSize: '30px',
              borderBottom: '2px solid #000',
            }}
          >
            Notices & Events
          </Box>
          {Array.isArray(filteredNotices) && filteredNotices.length > 0 && (
            <>
              {filteredNotices.map(notice => (
                <NoticeTile2
                  key={notice._id}
                  columns={[
                    { id: 'title' },
                    { id: 'details' },
                    { id: 'date' },
                  ]}
                  rows={[notice]}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SeeNotice;
