<script>
    async function fetchFiles() {
        try {
            const username = "rimehrab";
            const repoName = "dumpyard";
            const branchName = "files";
            const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents?ref=${branchName}`;

            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = '';

            if (data.length === 0) {
                fileList.innerHTML = '<li class="error">No files found</li>';
                return;
            }

            data.forEach((file, index) => {
                const li = document.createElement('li');
                li.classList.add('file-item');
                li.style.animationDelay = `${index * 0.1}s`;

                li.innerHTML = `
                    <a href="https://raw.githubusercontent.com/${username}/${repoName}/${branchName}/${file.path}" target="_blank" rel="noopener noreferrer">
                        <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span class="file-name">${file.name}</span>
                        <svg class="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                `;

                fileList.appendChild(li);
            });

        } catch (error) {
            console.error('Error:', error);
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = '<li class="error">⚠️ Failed to load files</li>';
        }
    }

    window.addEventListener('load', fetchFiles);
</script>