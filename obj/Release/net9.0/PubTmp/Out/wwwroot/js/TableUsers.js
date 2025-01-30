


document.addEventListener("DOMContentLoaded", function () {
    // Select all checkboxes
    const selectAllCheckbox = document.getElementById("selectAll");
    const rowCheckboxes = document.querySelectorAll(".select-row");

    selectAllCheckbox.addEventListener("change", function () {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // Filter rows
    const filterInput = document.getElementById("filterInput");
    const tableRows = document.querySelectorAll("#userTable tbody tr");

    filterInput.addEventListener("input", function () {
        const filterValue = this.value.toLowerCase();
        tableRows.forEach(row => {
            const name = row.cells[1].innerText.toLowerCase();
            const email = row.cells[2].innerText.toLowerCase();
            if (name.includes(filterValue) || email.includes(filterValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    // Block, Unblock, and Delete actions
    document.getElementById("blockSelected").addEventListener("click", async function () {
        const selectedRows = getSelectedRows();
        const userIds = selectedRows.map(row => row.querySelector(".select-row").dataset.userId);
        const response = await blockUsers(userIds);
        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        selectedRows.forEach(row => {
            row.querySelector(".status-column").innerText = "Blocked";
        });
        alert(`Blocked users: ${selectedRows.map(row => row.cells[2].innerText).join(", ")}`);
    });

    document.getElementById("unblockSelected").addEventListener("click", async function () {
        const selectedRows = getSelectedRows();
        for (const row of selectedRows) {
            const userId = row.querySelector(".select-row").dataset.userId;
            await unblockUser(userId);
            row.querySelector(".status-column").innerText = "Active";
        }
        alert(`Unblocked users: ${selectedRows.map(row => row.cells[2].innerText).join(", ")}`);
    });

    document.getElementById("deleteSelected").addEventListener("click", async function () {
        const selectedRows = getSelectedRows();
        const userIds = selectedRows.map(row => row.querySelector(".select-row").dataset.userId);
        const response = await deleteUsers(userIds);
        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        selectedRows.forEach(row => {
            row.remove();
        });
        alert(`Deleted users: ${selectedRows.map(row => row.cells[2].innerText).join(", ")}`);
    });

    function getSelectedRows() {
        return Array.from(rowCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.closest("tr"));
    }

    async function blockUsers(userIds) {
        const response = await fetch("/api/users/block", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userIds)
        });
        return response;
    }

    async function unblockUser(userId) {
        await fetch(`/api/users/unblock/${userId}`, { method: 'POST' });
    }

    async function deleteUsers(userIds) {
        const response = await fetch(`/api/users/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userIds)
        });
        return response;
    }
});

// sort Email
document.addEventListener("DOMContentLoaded", function () {
    let emailSortDirection = 0; // 0: unsorted, 1: ascending, -1: descending

    document.getElementById("sortEmailButton").addEventListener("click", function () {
        emailSortDirection = emailSortDirection === 1 ? -1 : 1;
        sortTableByEmail(emailSortDirection);
    });

    function sortTableByEmail(direction) {
        const tableBody = document.querySelector("#userTable tbody");
        const rows = Array.from(tableBody.querySelectorAll("tr"));

        rows.sort((a, b) => {
            const emailA = a.cells[2].innerText.toLowerCase();
            const emailB = b.cells[2].innerText.toLowerCase();

            if (emailA < emailB) return direction === 1 ? -1 : 1;
            if (emailA > emailB) return direction === 1 ? 1 : -1;
            return 0;
        });

        rows.forEach(row => tableBody.appendChild(row));

        // Update sort icon
        const sortIcon = document.getElementById("sortEmailIcon");
        sortIcon.textContent = direction === 1 ? "⬆" : "⬇";
    }
});




//$(document).ready(function () {
//    
//    loadUsers();

//    
//    $("#selectAll").on("change", function () {
//        $(".select-row").prop("checked", this.checked);
//    });

//    
//    $("#filterInput").on("input", function () {
//        const filterValue = $(this).val().toLowerCase();
//        $("#userTable tbody tr").each(function () {
//            const name = $(this).find(".name-column").text().toLowerCase();
//            const email = $(this).find(".email-column").text().toLowerCase();
//            $(this).toggle(name.includes(filterValue) || email.includes(filterValue));
//        });
//    });

//    
//    $("#blockSelected").on("click", async function () {
//        const selectedRows = getSelectedRows();
//        const userIds = selectedRows.map(row => $(row).find(".select-row").data("user-id"));

//        try {
//            const response = await blockUsers(userIds);
//            if (response.redirectUrl) {
//                window.location.href = response.redirectUrl;
//                return;
//            }
//            selectedRows.forEach(row => $(row).find(".status-column").text("Blocked"));
//            alert(`Blocked users: ${selectedRows.map(row => $(row).find(".email-column").text()).join(", ")}`);
//        } catch (error) {
//            console.error("Error blocking users:", error);
//        }
//    });

//    
//    $("#unblockSelected").on("click", async function () {
//        const selectedRows = getSelectedRows();
//        for (const row of selectedRows) {
//            const userId = $(row).find(".select-row").data("user-id");
//            await unblockUser(userId);
//            $(row).find(".status-column").text("Active");
//        }
//        alert(`Unblocked users: ${selectedRows.map(row => $(row).find(".email-column").text()).join(", ")}`);
//    });

//    
//    $("#deleteSelected").on("click", async function () {
//        const selectedRows = getSelectedRows();
//        const userIds = selectedRows.map(row => $(row).find(".select-row").data("user-id"));

//        try {
//            const response = await deleteUsers(userIds);
//            if (response.redirectUrl) {
//                window.location.href = response.redirectUrl;
//                return;
//            }
//            selectedRows.forEach(row => $(row).remove());
//            alert(`Deleted users: ${selectedRows.map(row => $(row).find(".email-column").text()).join(", ")}`);
//        } catch (error) {
//            console.error("Error deleting users:", error);
//        }
//    });

//    
//    function getSelectedRows() {
//        return $(".select-row:checked").closest("tr").toArray();
//    }

//    
//    let emailSortDirection = 0; // 0: не отсортировано, 1: по возрастанию, -1: по убыванию

//    $("#sortEmailButton").on("click", function () {
//        emailSortDirection = emailSortDirection === 1 ? -1 : 1;
//        sortTableByEmail(emailSortDirection);
//    });

//    function sortTableByEmail(direction) {
//        const tableBody = $("#userTable tbody");
//        const rows = tableBody.find("tr").toArray();

//        rows.sort((a, b) => {
//            const emailA = $(a).find(".email-column").text().toLowerCase();
//            const emailB = $(b).find(".email-column").text().toLowerCase();

//            if (emailA < emailB) return direction === 1 ? -1 : 1;
//            if (emailA > emailB) return direction === 1 ? 1 : -1;
//            return 0;
//        });

//        tableBody.append(rows);

//        
//        $("#sortEmailIcon").text(direction === 1 ? "⬆" : "⬇");
//    }

//    
//    async function loadUsers() {
//        try {
//            const response = await $.ajax({
//                url: "/api/users",
//                type: "GET"
//            });
//            populateUserTable(response);
//        } catch (error) {
//            console.error("Error loading users:", error);
//        }
//    }

//    function populateUserTable(users) {
//        const tableBody = $("#userTable tbody");
//        tableBody.empty();
//        users.forEach(user => {
//            const row = `
//                <tr>
//                    <td><input type="checkbox" class="select-row" data-user-id="${user.id}"></td>
//                    <td class="name-column">${user.userName}<br><span class="text-muted">${user.roleCompany}</span></td>
//                    <td class="email-column">${user.email}</td>
//                    <td title="${user.lastLoginTime}">${user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleString() : ''}</td>
//                    <td class="status-column">${user.isBlocked ? "Blocked" : "Active"}</td>
//                </tr>
//            `;
//            tableBody.append(row);
//        });
//    }

//    async function blockUsers(userIds) {
//        return $.ajax({
//            url: "/api/users/block",
//            type: "POST",
//            contentType: "application/json",
//            data: JSON.stringify(userIds)
//        });
//    }

//    async function unblockUser(userId) {
//        return $.ajax({
//            url: `/api/users/unblock/${userId}`,
//            type: "POST"
//        });
//    }

//    async function deleteUsers(userIds) {
//        return $.ajax({
//            url: "/api/users/delete",
//            type: "DELETE",
//            contentType: "application/json",
//            data: JSON.stringify(userIds)
//        });
//    }
//});

