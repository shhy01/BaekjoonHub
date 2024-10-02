const softeerVariables = {
    SUBMISSION_STATUS_SELECTOR: '.submission-result .status',  // 실제 선택자로 수정 필요
    CODE_EDITOR_SELECTOR: '.code-editor textarea',  // 실제 선택자로 수정 필요
    LANGUAGE_SELECTOR: 'select[name="language"]',  // 실제 선택자로 수정 필요
    PROBLEM_TITLE_SELECTOR: '.problem-title',  // 실제 선택자로 수정 필요
    SUBMIT_BUTTON_SELECTOR: '.submit-button',  // 실제 선택자로 수정 필요
    
    // 채점 결과 상태
    STATUS: {
        SUCCESS: 'success',
        WRONG: 'wrong',
        RUNNING: 'running'
    }
};

// 전역 변수로 내보내기
window.softeerVariables = softeerVariables;