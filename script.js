import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

const BreaksDashboard = () => {
  const [breakData, setBreakData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch break data for the selected agent (replace with your data fetching logic)
    const fetchData = async () => {
      // Replace the following line with your actual data fetching logic
      const data = await fetch(`/api/breaks?agent=${selectedAgent}`).then((response) => response.json());
      setBreakData(data);
    };

    fetchData();
  }, [selectedAgent]);

  useEffect(() => {
    // Prepare data for the chart (replace with your data processing logic)
    const prepareChartData = () => {
      // Replace the following line with your actual data processing logic
      const formattedData = breakData.reduce((acc, breakRecord) => {
        const date = breakRecord.timestamp.split('T')[0];
        const existingData = acc.find((data) => data.date === date);

        if (existingData) {
          existingData.duration += breakRecord.duration;
        } else {
          acc.push({
            date,
            duration: breakRecord.duration,
          });
        }

        return acc;
      }, []);
      setChartData(formattedData);
    };

    prepareChartData();
  }, [breakData]);

  const handleAgentChange = (event) => {
    setSelectedAgent(event.target.value);
  };

  return (
    <Container>
      <h1>Breaks Dashboard</h1>

      <FormControl fullWidth>
        <InputLabel id="agent-select-label">Select Agent</InputLabel>
        <Select
          labelId="agent-select-label"
          id="agent-select"
          value={selectedAgent}
          label="Select Agent"
          onChange={handleAgentChange}
        >
          <MenuItem value="agent1">Agent 1</MenuItem>
          <MenuItem value="agent2">Agent 2</MenuItem>
          {/* Add more agents as needed */}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={() => alert('Fetching and updating charts')}>
        Update Charts
      </Button>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default BreaksDashboard;