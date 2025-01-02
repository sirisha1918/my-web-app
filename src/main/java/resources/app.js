const API_URL = '/api/users';

// Fetch and display all users
async function fetchUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();
  const usersTable = document.getElementById('users');
  usersTable.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="edit" onclick="editUser(${user.id})">Edit</button>
        <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    usersTable.appendChild(row);
  });
}

// Add a new user
async function addUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (!name || !email) {
    alert('Name and email are required!');
    return;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  if (response.ok) {
    fetchUsers();
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
  }
}

// Delete a user
async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (response.ok) {
    fetchUsers();
  }
}

// Edit a user (inline editing can be added here)
function editUser(id) {
  alert('Edit functionality is not implemented yet.');
}

// Attach event listeners
document.getElementById('add-user').addEventListener('click', addUser);

// Initial fetch of users
fetchUsers();
