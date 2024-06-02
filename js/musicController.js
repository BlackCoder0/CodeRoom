
document.addEventListener('DOMContentLoaded', function () {/*文档加载完成，获取下列元素 */
    var audio = document.getElementById('backgroundMusic');/* 获取页面上ID为backgroundMusic的<audio>元素。*/
    var select = document.getElementById('musicSelect');/*获取ID为musicSelect的选择器元素，用于选择不同的音乐。*/
    var playPauseButton = document.getElementById('playPauseButton');/*获取左侧音乐列表的播放/暂停按钮。 */
    var playPauseButtons = document.querySelectorAll('.playPauseBtn');/*获取底部音乐列表的播放/暂停按钮。 */
    var currentMusic = localStorage.getItem('currentMusic') || select.value;/*初始化当前音乐 */

    // 设置<audio>元素的源为当前音乐，并检查音乐是否应该继续播放。
    function setMusicSource() {
        audio.src = currentMusic;
        if (localStorage.getItem('isMusicPlaying') === 'true') {
            audio.play();
        }
    }

    // 初始化音乐播放
    setMusicSource();

    // 音乐播放控制（右侧按钮）
    playPauseButton.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            localStorage.setItem('isMusicPlaying', 'true');
            playPauseButton.textContent = '暂停';
        } else {
            audio.pause();
            localStorage.setItem('isMusicPlaying', 'false');
            playPauseButton.textContent = '播放';
        }
        updateTableButtons();
    });

    // 选择音乐
    select.addEventListener('change', function () {
        currentMusic = select.value;
        localStorage.setItem('currentMusic', currentMusic);
        setMusicSource();
        if (!audio.paused) {
            audio.play();
        }
        updateTableButtons();
    });

    // 表格中每个按钮的播放控制
    playPauseButtons.forEach(button => {
        button.addEventListener('click', function () {
            var musicSrc = this.getAttribute('data-src');
            if (currentMusic !== musicSrc) {
                currentMusic = musicSrc;
                localStorage.setItem('currentMusic', currentMusic);
                setMusicSource();
                audio.play();
                localStorage.setItem('isMusicPlaying', 'true');
                updateMainButton();
            } else {
                if (audio.paused) {
                    audio.play();
                    localStorage.setItem('isMusicPlaying', 'true');
                } else {
                    audio.pause();
                    localStorage.setItem('isMusicPlaying', 'false');
                }
            }
            updateTableButtons();
        });
    });

    // 更新表格按钮状态
    function updateTableButtons() {
        playPauseButtons.forEach(button => {
            var musicSrc = button.getAttribute('data-src');
            if (currentMusic === musicSrc) {
                button.textContent = audio.paused ? '播放' : '暂停';
            } else {
                button.textContent = '播放';
            }
        });
    }

    // 更新右侧按钮状态
    function updateMainButton() {
        playPauseButton.textContent = audio.paused ? '播放' : '暂停';
    }

    // 初始化按钮状态
    updateTableButtons();
    updateMainButton();

    // 监听音乐播放结束事件，自动重新开始
    audio.addEventListener('ended', function () {
        audio.play();
    });

    // 监听窗口卸载事件，保存音乐播放状态
    window.addEventListener('beforeunload', function () {
        localStorage.setItem('isMusicPlaying', audio.paused ? 'false' : 'true');
    });

});
