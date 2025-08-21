import React from 'react';
import {
  useTheme,
  useCounter,
  useUser,
  useNotifications,
} from '../jotai/hooks';

function AppDemo() {
  const { theme, toggleTheme } = useTheme();
  const { count, increment, decrement, reset } = useCounter();
  const {
    currentUser,
    isAuthenticated,
    userLoading,
    userError,
    setUser,
    clearUser,
  } = useUser();
  const { notifications, addNotification, removeNotification, clearAll } =
    useNotifications();

  const handleLogin = () => {
    setUser({
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
    });
    addNotification({
      type: 'success',
      message: 'Successfully logged in!',
      title: 'Welcome back',
    });
  };

  const handleLogout = () => {
    clearUser();
    addNotification({
      type: 'info',
      message: 'You have been logged out.',
    });
  };

  const handleAddNotification = () => {
    addNotification({
      type: 'warning',
      message: 'This is a test notification!',
      title: 'Test',
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>App State Demo</h2>

      {/* Theme Section */}
      <section
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ccc',
        }}
      >
        <h3>Theme Management</h3>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </section>

      {/* Counter Section */}
      <section
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ccc',
        }}
      >
        <h3>Global Counter</h3>
        <p>
          Count: <strong>{count}</strong>
        </p>
        <button onClick={increment}>+</button>
        <button onClick={decrement} style={{ marginLeft: '5px' }}>
          -
        </button>
        <button onClick={reset} style={{ marginLeft: '5px' }}>
          Reset
        </button>
      </section>

      {/* User Section */}
      <section
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ccc',
        }}
      >
        <h3>User Management</h3>
        {isAuthenticated ? (
          <div>
            <p>
              Welcome, <strong>{currentUser?.name}</strong>!
            </p>
            <p>Email: {currentUser?.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>Not logged in</p>
            <button onClick={handleLogin} disabled={userLoading}>
              {userLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        )}
        {userError && <p style={{ color: 'red' }}>Error: {userError}</p>}
      </section>

      {/* Notifications Section */}
      <section
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ccc',
        }}
      >
        <h3>Notifications ({notifications.length})</h3>
        <button onClick={handleAddNotification}>Add Test Notification</button>
        <button onClick={clearAll} style={{ marginLeft: '10px' }}>
          Clear All
        </button>

        <div style={{ marginTop: '10px' }}>
          {notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor:
                  notification.type === 'error'
                    ? '#ffebee'
                    : notification.type === 'warning'
                      ? '#fff3e0'
                      : notification.type === 'success'
                        ? '#e8f5e8'
                        : '#e3f2fd',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              <strong>{notification.title || notification.type}</strong>
              <p>{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                style={{ fontSize: '12px' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AppDemo;
