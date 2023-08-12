$(document).ready(function () {
    $('[data-mdb-toggle="tooltip"]').tooltip();

    $('.edit-task-button').click(function () {
        var taskId = $(this).data('task-id');
        // var task = getTaskById(taskId); // Implement a function to fetch task details by ID
        // fillEditTaskForm(task);
    });

    // Handle click event for delete task button
    $('.delete-task-button').click(function () {
        var taskId = $(this).data('task-id');
        $('#confirmDeleteTask').attr('href', '/delete_task/' + taskId); // Update link
    });

    // Function to fetch task details by ID (replace with actual implementation)
    // function getTaskById(taskId) {
    //     // Replace with actual code to fetch task details from your data source (e.g., database)
    //     return {
    //         id: taskId,
    //         task: "Task Name",
    //         description: "Task Description",
    //         due_date: "2023-08-15",
    //         due_time: "12:00",
    //         category: "high"
    //     };
    // }

    function fillEditTaskForm(task) {
        $('#taskText').val(task.task);
        $('#description').val(task.description);
        $('#dueDate').val(task.due_date);
        $('#dueTime').val(task.due_time);
        $('#priority').val(task.category);
        $('#editTaskModal').modal('show');
    }
});

function toggleTaskCompletion(taskId, checked) {
    $.ajax({
        type: "POST",
        url: `/toggle_task_completion/${taskId}/${checked ? 1 : 0}`,
        success: function (data) {
            console.log(data.message);
        },
        error: function (error) {
            console.error("An error occurred:", error);
        }
    });
}

// Function to get URL parameters by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    var filterCategory = document.getElementById("filterCategory");
    var currentFilter = getParameterByName("filter"); // Get the current filter parameter from the URL

    // Set the selected attribute for the active filter option
    if (currentFilter) {
        var activeOption = document.querySelector(`#filterCategory option[value="${currentFilter}"]`);
        if (activeOption) {
            activeOption.selected = true;
        }
    }

    filterCategory.addEventListener("change", function () {
        var selectedCategory = filterCategory.value;
        var currentUrl = window.location.href;
        var filterIndex = currentUrl.indexOf("filter=");

        if (selectedCategory === "all") {
            var updatedUrl = currentUrl.replace(/filter=[^&]+&?/, "");
            window.location.href = updatedUrl;
        } else {
            if (filterIndex !== -1) {
                var updatedUrl = currentUrl.replace(/filter=[^&]+/, "filter=" + selectedCategory);
                window.location.href = updatedUrl;
            } else {
                var separator = currentUrl.indexOf("?") !== -1 ? "&" : "?";
                var newUrl = currentUrl + separator + "filter=" + selectedCategory;
                window.location.href = newUrl;
            }
        }
    });
});

       // Wait for the DOM to be fully loaded before executing the script
       document.addEventListener("DOMContentLoaded", function () {
        // Get the search bar input element and the list of task items
        var searchBar = document.getElementById("searchBar");
        var tasks = document.querySelectorAll(".list-group-item");

        // Listen for input changes in the search bar
        searchBar.addEventListener("input", function () {
            // Convert the search term to lowercase for case-insensitive matching
            var searchTerm = searchBar.value.toLowerCase();

            // Iterate through each task item in the list
            tasks.forEach(function (task) {
                // Get the task title text content and convert it to lowercase
                var taskText = task.textContent.toLowerCase();

                // Check if the task title includes the search term
                if (taskText.includes(searchTerm)) {
                    // If the search term is found in the title, display the task
                    task.style.display = "block";
                } else {
                    // If the search term is not found in the title, hide the task
                    task.style.display = "none";
                }
            });
        });
    });


    // Initialize tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
