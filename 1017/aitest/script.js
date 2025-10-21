// =================================================================================================
// 1. 기본 설정: 변수 선언 및 DOM 요소 가져오기
// - 코드 전체에서 사용될 HTML 요소들을 미리 변수에 할당합니다.
// - 게시판의 상태를 관리할 변수들(posts, currentPage 등)을 선언합니다.
// =================================================================================================
const boardList = document.getElementById('board-list');
const pageNumbers = document.getElementById('page-numbers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const writeBtn = document.getElementById('write-btn');

// 글쓰기 모달 요소
const writeModal = document.getElementById('write-modal');
const closeWriteModalBtn = writeModal.querySelector('.close-btn');
const writeForm = document.getElementById('write-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const contentInput = document.getElementById('content-input');
const passwordInput = document.getElementById('password-input');

// 게시글 보기 모달 요소
const viewModal = document.getElementById('view-modal');
const closeViewModalBtn = viewModal.querySelector('.close-btn');
const viewTitle = document.getElementById('view-title');
const viewAuthor = document.getElementById('view-author');
const viewDate = document.getElementById('view-date');
const viewViews = document.getElementById('view-views');
const viewContent = document.getElementById('view-content');

let postsPerPage = 5;
let currentPage = 1;
let posts = [];

// =================================================================================================
// 2. 데이터 준비: 초기 데이터 생성
// - 실제 서버가 없으므로, 화면에 보여줄 더미(dummy) 데이터를 생성하는 함수들입니다.
// =================================================================================================
// 랜덤 텍스트 생성 함수
function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// 더미 데이터 생성
function generateDummyPosts(count) {
    const sampleKorean = [
        "오늘 하루도 힘내세요!", "새로운 각오를 다져봅니다.", "꾸준함이 진리입니다.",
        "작은 성공이 모여 큰 성공을 이룹니다.", "어제보다 나은 오늘을 만들어봐요.",
        "포기하지 않는 당신을 응원합니다.", "오늘 계획한 일은 꼭 실천하기!",
        "한 걸음 더 나아가는 하루가 되길.", "열정으로 가득 찬 하루 보내세요.",
        "당신의 노력을 믿으세요."
    ];
    const dummyPosts = [];
    for (let i = 1; i <= count; i++) {
        const randomContent = sampleKorean[Math.floor(Math.random() * sampleKorean.length)];
        dummyPosts.push({
            id: i,
            title: `${i}번째 다짐: ${randomContent}`,
            content: `이것은 ${i}번째 다짐의 상세 내용입니다.\n\n${generateRandomText(150)}`,
            author: `사용자${Math.ceil(Math.random() * 10)}`,
            date: `2024-05-16`,
            views: Math.floor(Math.random() * 100),
            password: String(Math.floor(1000 + Math.random() * 9000)) // 임의의 4자리 암호
        });
    }
    return dummyPosts;
}

// 더미 데이터 생성 함수를 호출하여 `posts` 배열에 초기 데이터를 채웁니다.
posts = generateDummyPosts(25);

// =================================================================================================
// 3. 화면 렌더링: 데이터를 HTML로 변환하여 표시
// - `posts` 배열에 있는 데이터를 기반으로 실제 화면을 그리는 함수들입니다.
// - `displayPosts`: 현재 페이지에 해당하는 게시글 목록을 그려줍니다.
// - `displayPagination`: 전체 게시글 수와 페이지당 글 수를 계산하여 페이지 번호 버튼들을 만듭니다.
// =================================================================================================
function displayPosts(page) {
    boardList.innerHTML = '';
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    paginatedPosts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        listItem.dataset.postId = post.id;
        listItem.innerHTML = `
            <div class="post-content-wrapper">
                <div class="post-item-title">${post.title}</div>
                <div class="post-item-meta">
                    <span>${post.author}</span> | <span>${post.date}</span> | <span>조회수: ${post.views}</span>
                </div>
            </div>
            <button class="delete-btn">삭제</button>
        `;
        boardList.appendChild(listItem);
    });
}

// 게시글 제목 클릭 이벤트 (이벤트 위임 사용)
// - `boardList` 전체에 하나의 이벤트 리스너를 추가하여, 어떤 자식 요소가 클릭되었는지 확인합니다.
// - 이렇게 하면 각 게시글마다 이벤트 리스너를 추가할 필요가 없어 성능에 유리합니다.
boardList.addEventListener('click', (event) => {
    // 클릭된 요소가 제목인지, 삭제 버튼인지 확인합니다.
    const titleElement = event.target.closest('.post-item-title');
    const deleteButton = event.target.closest('.delete-btn');

    // 4-1. 기능: 게시글 상세 보기
    if (titleElement) {
        // `closest`를 사용해 클릭된 요소에서 가장 가까운 `.post-item`을 찾아 `postId`를 가져옵니다.
        const postId = titleElement.closest('.post-item').dataset.postId;
        const post = posts.find(p => p.id == postId);

        if (post) {
            post.views++; // 조회수 증가
            showPostDetails(post);
            displayPosts(currentPage); // 조회수 갱신을 위해 목록 다시 그리기
        }
    // 4-2. 기능: 게시글 삭제
    } else if (deleteButton) {
        const postId = deleteButton.closest('.post-item').dataset.postId;
        const postToDelete = posts.find(p => p.id == postId);

        if (postToDelete) {
            const enteredPassword = prompt("게시글을 삭제하려면 암호를 입력하세요.");
            if (enteredPassword === null) return; // 사용자가 취소한 경우

            // 마스터 암호 '0000' 또는 게시글의 암호가 일치하는 경우
            if (enteredPassword === '0000' || enteredPassword === postToDelete.password) {
                posts = posts.filter(p => p.id != postId);
                alert("게시글이 삭제되었습니다.");
                // 현재 페이지에 글이 하나도 없게 되면 이전 페이지로 이동
                if (posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).length === 0 && currentPage > 1) {
                    currentPage--;
                }
                rerenderBoard();
            } else {
                alert("암호가 일치하지 않습니다.");
            }
        }
    }
});

function displayPagination() {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.textContent = i;
        // 4-3. 기능: 페이지 번호 클릭
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            displayPosts(currentPage);
            updatePaginationButtons();
            updateActivePageNumber();
        });
        pageNumbers.appendChild(pageNumber);
    }
}

// =================================================================================================
// 5. UI 상태 업데이트: 보조 함수들
// - UI의 일관성을 유지하기 위한 작은 도우미 함수들입니다. (예: 버튼 활성화/비활성화, 현재 페이지 강조)
// =================================================================================================
function updatePaginationButtons() {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function updateActivePageNumber() {
    const pageButtons = pageNumbers.querySelectorAll('button');
    pageButtons.forEach(button => {
        if (parseInt(button.textContent) === currentPage) {
            button.style.fontWeight = 'bold';
            button.style.textDecoration = 'underline';
        } else {
            button.style.fontWeight = 'normal';
            button.style.textDecoration = 'none';
        }
    });
}

// 4-4. 기능: 이전/다음 페이지로 이동
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPosts(currentPage);
        updatePaginationButtons();
        updateActivePageNumber();
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPosts(currentPage);
        updatePaginationButtons();
        updateActivePageNumber();
    }
});

// `rerenderBoard` 함수는 게시글 목록, 페이지네이션 등 화면의 여러 부분을
// 한 번에 새로고침해야 할 때 사용하는 유용한 함수입니다.
function rerenderBoard() {
    displayPosts(currentPage);
    displayPagination();
    updatePaginationButtons();
    updateActivePageNumber();
    updateActivePageSizeButton();
}

// =================================================================================================
// 6. 초기 실행
// - 페이지가 처음 로드될 때, 위에서 만든 함수들을 호출하여 게시판의 초기 화면을 구성합니다.
// =================================================================================================
displayPosts(currentPage);
displayPagination();
updatePaginationButtons();
updateActivePageNumber();

// =================================================================================================
// 7. 추가 기능 구현
// - 게시판의 핵심 기능 외 추가적인 편의 기능들을 구현합니다.
// =================================================================================================
// 7-1. 기능: 페이지당 게시글 수 변경
const pageSizeButtons = document.querySelectorAll('.page-size-btn');

function updateActivePageSizeButton() {
    pageSizeButtons.forEach(button => {
        if (parseInt(button.dataset.size) === postsPerPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

pageSizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        postsPerPage = parseInt(button.dataset.size);
        currentPage = 1; // 페이지 수를 바꾸면 1페이지로 리셋

        rerenderBoard();
    });
});

updateActivePageSizeButton(); // 초기 활성 버튼 설정
// 7-2. 기능: 글쓰기 모달 창 관리

// 글쓰기 버튼 클릭 시 모달 열기
writeBtn.addEventListener('click', () => {
    writeModal.style.display = 'block';
});

// 닫기 버튼 클릭 시 모달 닫기
closeWriteModalBtn.addEventListener('click', () => {
    writeModal.style.display = 'none';
});

// 폼 제출(새 글 작성) 이벤트
writeForm.addEventListener('submit', (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title: titleInput.value,
        content: contentInput.value,
        author: authorInput.value,
        password: passwordInput.value,
        date: new Date().toISOString().split('T')[0], // 현재 날짜
        views: 0
    };

    posts.unshift(newPost); // 새 글을 배열의 맨 앞에 추가

    // 폼 초기화
    titleInput.value = '';
    authorInput.value = '';
    contentInput.value = '';
    passwordInput.value = '';

    writeModal.style.display = 'none'; // 모달 닫기

    // 게시판 및 페이지네이션 새로고침
    currentPage = 1; // 새 글 작성 후 첫 페이지로 이동
    rerenderBoard();
});

// 7-3. 기능: 게시글 보기 모달 창 관리
function showPostDetails(post) {
    viewTitle.textContent = post.title;
    viewAuthor.textContent = post.author;
    viewDate.textContent = post.date;
    viewViews.textContent = post.views;
    viewContent.textContent = post.content;
    viewModal.style.display = 'block';
}

closeViewModalBtn.addEventListener('click', () => {
    viewModal.style.display = 'none';
});

// 7-4. 기능: 모달 창 외부 클릭 시 닫기
window.addEventListener('click', (event) => {
    if (event.target == writeModal) {
        writeModal.style.display = 'none';
    }
    if (event.target == viewModal) {
        viewModal.style.display = 'none';
    }
});
