const softeerParsing = {
    // 문제 정보 파싱
    parseQuestion: async function() {
        const problemId = softeerUtil.extractProblemId();
        const problemTitle = await this.getProblemTitle();
        const difficulty = await this.getDifficulty();

        return {
            id: problemId,
            title: problemTitle,
            difficulty: difficulty,
            platform: 'Softeer'
        };
    },

    // 제출 정보 파싱
    parseSubmission: async function() {
        const code = await this.getCode();
        const language = await this.getLanguage();

        return {
            code: code,
            language: language
        };
    },

    // 문제 제목 가져오기
    getProblemTitle: async function() {
        const titleElement = await softeerUtil.waitForElement(softeerVariables.PROBLEM_TITLE_SELECTOR);
        return titleElement ? titleElement.textContent.trim() : '';
    },

    // 난이도 가져오기
    getDifficulty: async function() {
        // Softeer 사이트의 난이도 표시 방식에 따라 구현 필요
        // 예시 구현
        const difficultyElement = await softeerUtil.waitForElement('.problem-difficulty');
        return difficultyElement ? difficultyElement.textContent.trim() : 'Unknown';
    },

    // 제출한 코드 가져오기
    getCode: async function() {
        const codeElement = await softeerUtil.waitForElement(softeerVariables.CODE_EDITOR_SELECTOR);
        return codeElement ? codeElement.value : '';
    },

    // 사용한 프로그래밍 언어 가져오기
    getLanguage: async function() {
        const languageElement = await softeerUtil.waitForElement(softeerVariables.LANGUAGE_SELECTOR);
        return languageElement ? languageElement.value : '';
    }
};

// 전역 변수로 내보내기
window.softeerParsing = softeerParsing;