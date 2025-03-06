let currentEditId = null;
        let isEditMode = false;

        // Toggle edit mode
        function toggleEditMode() {
            isEditMode = !isEditMode;
            document.body.classList.toggle('edit-mode');
            const btn = document.querySelector('.btn');
            
            if (isEditMode) {
                btn.textContent = 'Kết Thúc Chỉnh Sửa';
                alert('Bạn đã bật chế độ chỉnh sửa. Nhấp vào bất kỳ thông tin nào để chỉnh sửa.');
            } else {
                btn.textContent = 'Chỉnh Sửa Thông Tin';
            }
        }

        // Edit text content
        function editText(id) {
            if (!isEditMode) return;
            
            currentEditId = id;
            const element = document.getElementById(id);
            const content = element.innerText;
            
            document.getElementById('editField').value = content;
            document.getElementById('editModal').style.display = 'flex';
        }

        // Save edited content
        function saveEdit() {
            const newContent = document.getElementById('editField').value;
            document.getElementById(currentEditId).innerText = newContent;
            closeModal();
        }

        // Close edit modal
        function closeModal() {
            document.getElementById('editModal').style.display = 'none';
            currentEditId = null;
        }

        // Open image modal
        function openImageModal() {
            document.getElementById('imageModal').style.display = 'flex';
        }

        // Close image modal
        function closeImageModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        // Save image URL
        function saveImage() {
            const imageUrl = document.getElementById('imageUrl').value;
            if (imageUrl) {
                document.getElementById('avatar').src = imageUrl;
            }
            closeImageModal();
        }

        // Toggle dark/light theme
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
        }

        // Close modals when clicking outside
        window.onclick = function(event) {
            const editModal = document.getElementById('editModal');
            const imageModal = document.getElementById('imageModal');
            if (event.target === editModal) {
                closeModal();
            }
            if (event.target === imageModal) {
                closeImageModal();
            }
        }