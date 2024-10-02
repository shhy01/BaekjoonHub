const softeerUpload = {
    // GitHub에 업로드
    upload: async function() {
        try {
            const submission = await softeerParsing.parseSubmission();
            const question = await softeerParsing.parseQuestion();

            if (!submission.code || !question.id) {
                throw new Error('필요한 정보를 찾을 수 없습니다.');
            }

            // 저장소 정보 가져오기
            const { owner, repo, path } = await chrome.storage.sync.get(['owner', 'repo', 'path']);
            
            softeerUtil.updateStatus('GitHub에 업로드 중...', false);

            // GitHub API를 통해 커밋
            const result = await window.Github.upload(
                owner,
                repo,
                path,
                question,
                submission,
                'solve: Softeer ' + question.id + '. ' + question.title
            );

            softeerUtil.updateStatus('성공적으로 업로드되었습니다!', true);
            return result;
        } catch (error) {
            console.error('업로드 실패:', error);
            softeerUtil.updateStatus('업로드 실패: ' + error.message, false);
            throw error;
        }
    }
};

// 전역 변수로 내보내기
window.softeerUpload = softeerUpload;