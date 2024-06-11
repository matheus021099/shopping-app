import React, { useState, useEffect } from 'react';
import Header from '../shared/LoggedInHeader';
import Footer from '../shared/Footer';
import { Container, Typography, Box, Grid, List, ListItem, ListItemText, ListItemIcon, Paper } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { fetchHelpTopics, fetchHelpTopicDetails } from '../../api';

const Help = () => {
  const [helpTopics, setHelpTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicDetails, setSelectedTopicDetails] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetchHelpTopics();
        setHelpTopics(response);
      } catch (error) {
        console.error('Failed to fetch help topics', error);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic);
    try {
      const response = await fetchHelpTopicDetails(topic.id);
      setSelectedTopicDetails(response);
    } catch (error) {
      console.error('Failed to fetch topic details', error);
    }
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: '64px', marginBottom: '64px' }}>
        <Typography variant="h4" gutterBottom>
          Help Center
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <List component="nav">
              {helpTopics.map((topic) => (
                <ListItem button key={topic.id} onClick={() => handleTopicSelect(topic)}>
                  <ListItemIcon>
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={topic.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {topic.shortDescription}
                        </Typography>
                        <Box>
                          <Typography component="span" variant="caption" color="textSecondary">
                            Last updated: {new Date(topic.lastUpdated).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            {selectedTopicDetails ? (
              <Paper style={{ padding: '16px' }}>
                <Typography variant="h4">{selectedTopicDetails.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Last updated: {new Date(selectedTopicDetails.lastUpdated).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedTopicDetails.content}
                </Typography>
                <Box>
                  {selectedTopicDetails.attachments.map((attachment) => (
                    <Box key={attachment.id} mb={2}>
                      {attachment.type === 'image' && <img src={attachment.url} alt={attachment.name} style={{ width: '100%' }} />}
                      {attachment.type === 'video' && (
                        <video controls style={{ width: '100%' }}>
                          <source src={attachment.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </Box>
                  ))}
                </Box>
              </Paper>
            ) : (
              <Typography variant="h6" color="textSecondary" align="center">
                Select a help topic to view details
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Help;

