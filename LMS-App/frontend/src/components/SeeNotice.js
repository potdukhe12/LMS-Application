import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import NoticeTile from './NoticeTile';
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

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
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
          {Array.isArray(noticesList) && noticesList.length > 0 && (
            <>
              {noticesList.map((notice) => (
                <NoticeTile
                key={notice._id}
                title={notice.title}
                details={notice.details}
                date={new Date(notice.date).toISOString().substring(0, 10)}
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
