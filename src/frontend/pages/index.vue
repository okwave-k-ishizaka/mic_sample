<template>
  <div>
    <a id="download">Download</a>
    <button id="stop">Stop</button>
    <button id="post" @click="postData">Post</button>
    <audio id="audio" controls></audio>
  </div>
</template>

<script>
let file = null
export default {
  data: function() {
    return {
    }
  },
  mounted() {
    const downloadLink = document.getElementById('download');
    const stopButton = document.getElementById('stop');
    const audioElement = document.getElementById('audio')

    const handleSuccess = function (stream) {

      const options = {mimeType: 'audio/webm'};
      const recordedChunks = [];
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.addEventListener('dataavailable', function (e) {
        if (e.data.size > 0) recordedChunks.push(e.data);
      });

      mediaRecorder.addEventListener('stop', function () {
        const audioBlob = new Blob(recordedChunks,{
          type: mediaRecorder.mimeType
        })
        file = audioBlob

        audioElement.src = URL.createObjectURL(audioBlob)
        downloadLink.href = URL.createObjectURL(audioBlob);
        downloadLink.download = 'mic.wav';
        console.log(file)
      });

      stopButton.addEventListener('click', function () {
        mediaRecorder.stop();
      });
      mediaRecorder.start();
    };

    navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then(handleSuccess);
  },
  methods: {
    postData: function () {
      let formData = new FormData
      formData.append('file', file, 'mic.wav')
      this.$axios.$post('/api/mic',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
        console.log(reponse.data.status);
      }).catch(error => {
        console.log(error);
      })


    }
  }

}
</script>
