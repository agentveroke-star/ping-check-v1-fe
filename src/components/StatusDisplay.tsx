import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { StatusState } from '../types/api';
import './StatusDisplay.css';

const StatusDisplay: React.FC = () => {
  const [state, setState] = useState<StatusState>({
    loading: true,
    error: null,
    ping: null,
    health: null,
    lastUpdated: null,
  });

  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  // Fetch status function
  const fetchStatus = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { ping, health } = await apiService.getStatus();
      const now = new Date().toLocaleTimeString();
      
      setState({
        loading: false,
        error: null,
        ping,
        health,
        lastUpdated: now,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to connect to backend service. Please ensure the backend server is running on port 3001.',
        lastUpdated: new Date().toLocaleTimeString(),
      }));
    }
  };

  // Initial fetch and auto-refresh setup
  useEffect(() => {
    fetchStatus();

    let intervalId: number | null = null;
    
    if (autoRefresh) {
      intervalId = window.setInterval(fetchStatus, 5000); // Refresh every 5 seconds
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [autoRefresh]);

  const handleRefresh = () => {
    fetchStatus();
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return timestamp;
    }
  };

  // Get health status color
  const getHealthStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'ok':
        return 'status-ok';
      case 'error':
        return 'status-error';
      case 'warning':
        return 'status-warning';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div className="status-container">
      <header className="status-header">
        <h1>Service Status Dashboard</h1>
        <p className="service-name">ping-check-v1</p>
      </header>

      <div className="controls">
        <button 
          className="btn btn-primary" 
          onClick={handleRefresh}
          disabled={state.loading}
        >
          {state.loading ? 'Refreshing...' : 'Refresh Now'}
        </button>
        
        <button 
          className={`btn ${autoRefresh ? 'btn-secondary active' : 'btn-secondary'}`}
          onClick={toggleAutoRefresh}
        >
          {autoRefresh ? '✓ Auto-Refresh On' : 'Auto-Refresh Off'}
        </button>
      </div>

      {state.loading && !state.ping && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Connecting to backend service...</p>
        </div>
      )}

      {state.error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Connection Error</h3>
          <p>{state.error}</p>
          <button className="btn btn-primary" onClick={handleRefresh}>
            Retry Connection
          </button>
        </div>
      )}

      {!state.loading && state.ping && state.health && (
        <div className="status-grid">
          <div className="status-card ping-card">
            <div className="card-header">
              <h2>Ping Status</h2>
              <div className="status-indicator status-ok"></div>
            </div>
            
            <div className="card-content">
              <div className="status-item">
                <span className="label">Message:</span>
                <span className="value message-value">{state.ping.message}</span>
              </div>
              
              <div className="status-item">
                <span className="label">Service:</span>
                <span className="value service-value">{state.ping.service}</span>
              </div>
              
              <div className="status-item">
                <span className="label">Response Time:</span>
                <span className="value timestamp-value">
                  {formatTimestamp(state.ping.timestamp)}
                </span>
              </div>
            </div>
          </div>

          <div className="status-card health-card">
            <div className="card-header">
              <h2>Health Status</h2>
              <div className={`status-indicator ${getHealthStatusColor(state.health.status)}`}></div>
            </div>
            
            <div className="card-content">
              <div className="status-item">
                <span className="label">Status:</span>
                <span className={`value health-value ${getHealthStatusColor(state.health.status)}`}>
                  {state.health.status.toUpperCase()}
                </span>
              </div>
              
              <div className="status-details">
                <p>The health endpoint confirms the service is operational and responding to requests.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer">
        <div className="last-updated">
          <span className="label">Last Updated:</span>
          <span className="value">{state.lastUpdated || 'Never'}</span>
        </div>
        
        <div className="connection-info">
          <span className="label">Backend URL:</span>
          <span className="value">http://localhost:3001/api</span>
        </div>
        
        <div className="instructions">
          <p>
            <strong>Note:</strong> Ensure the backend server is running on port 3001.
            {!autoRefresh && ' Auto-refresh is currently disabled.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusDisplay;
