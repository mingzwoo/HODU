// 모달 팝업
const modal = document.querySelector("#modal");
const openButton = document.querySelector(".modal_btn");
const closeButton = document.querySelector(".close_btn");
const topButton = document.querySelector(".top");
const downloadAlert = document.querySelector(".alertdown");

// 모달팝업 열기
function openModal() {
    modal.style.display = "flex";
}

// 모달팝업 닫기
function closeModal() {
    modal.style.display = "none";
}

// 바탕화면 클릭시 팝업닫기
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};


openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
downloadAlert.addEventListener('click', function() {
    alert('파일 없음');
});






// 탑버튼 클릭시 화면상단으로 이동
function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

topButton.addEventListener("click", scrollTop);







// 모바일 햄버거메뉴
const btnMobile = document.querySelector('.btn_mobile');
const btnClose = document.querySelector('.btn_close');

btnMobile.addEventListener('click', function() {
    document.querySelector('.nav').classList.add('active');
});

btnClose.addEventListener('click', function() {
    document.querySelector('.nav').classList.remove('active');
});





// 지도좌표
const posX = 33.4424896;
const posY = 126.5714226;

const mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(posX, posY), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다
const markerPosition  = new kakao.maps.LatLng(posX, posY);

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);



// 이미지 무한스크롤
document.addEventListener('DOMContentLoaded', function() {

    let imgIndex = 1; // 이미지 인덱스 (이미지 7부터 시작)
    let maxImage = 6; // 최대 이미지 개수
    let imagesPerLoad = 3; // 한 번에 로드할 이미지 개수
    let isLoading = false; // 로딩 중인지 아닌지를 표시하는 플래그
    let continueScrolling = true; // 스크롤을 계속할지 여부를 나타내는 플래그

    const btnMore = document.getElementById('btn_more');
    const imageList = document.getElementById('image-list');
    const loading = document.getElementById('loading');
    const scrollStopBtn = document.querySelector('.scrollstop_btn');

    btnMore.addEventListener('click', function() {
        scrollStopBtn.style.display = 'inline-block';
        this.style.display = 'none';

        // 무한 스크롤을 위해 플래그 다시 설정
        continueScrolling = true;

        // Show more 버튼을 눌렀을 때 스크롤 이벤트 리스너 추가
        addScrollListener();
    });

    scrollStopBtn.addEventListener('click', function() {
        continueScrolling = false;
        scrollStopBtn.style.display = 'none';
        btnMore.style.display = 'inline-block';
        loading.style.display = 'none';
        isLoading = false;
    });

    function addScrollListener() {
        window.addEventListener('scroll', function () {
            if (!isLoading && continueScrolling && window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                isLoading = true;
                loading.style.display = 'block';

                setTimeout(function () {
                    if (continueScrolling) {
                        loadImages();
                        loading.style.display = 'none';
                        isLoading = false;
                    }
                }, 1000);
            }
        });
    }

    function loadImages() {
        for (var i = 0; i < imagesPerLoad; i++) {
            if (imgIndex > maxImage) {
                imgIndex = 1;
            }
            var imgElement = document.createElement('li');
            imgElement.innerHTML = '<img src="./image/img_' + ("0" + imgIndex).slice(-2) + '.jpg" alt="">';
            imageList.appendChild(imgElement);
            imgIndex++;
        }
    }
});