/** NOTE: softeer 핵심 로직입니다. */

// 초기화 함수
async function initializeSofteerHub() {
    // 제출 버튼 찾기
    const submitButton = await softeerUtil.waitForElement(softeerVariables.SUBMIT_BUTTON_SELECTOR);
    if (!submitButton) return;

    // BaekjoonHub UI 추가
    const statusContainer = softeerUtil.createStatusUI();
    submitButton.parentNode.insertBefore(statusContainer, submitButton.nextSibling);

    // 제출 결과 모니터링 시작
    startSubmissionMonitoring();
}

// 제출 결과 모니터링
async function startSubmissionMonitoring() {
    const statusElement = await softeerUtil.waitForElement(softeerVariables.SUBMISSION_STATUS_SELECTOR);
    if (!statusElement) return;

    const observer = new MutationObserver(async (mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                const status = statusElement.textContent.trim();
                
                if (status === softeerVariables.STATUS.SUCCESS) {
                    observer.disconnect();
                    try {
                        await softeerUpload.upload();
                    } catch (error) {
                        console.error('Softeer 업로드 실패:', error);
                    }
                }
            }
        }
    });

    observer.observe(statusElement, {
        childList: true,
        characterData: true,
        subtree: true
    });
}

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSofteerHub);
} else {
    initializeSofteerHub();
}