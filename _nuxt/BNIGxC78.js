import{J as T,r as _}from"./D7oEU2MU.js";import{c as y}from"./Bt-ow_Jv.js";import{u as L}from"./B5PuVeRZ.js";function w(){return w=Object.assign?Object.assign.bind():function(c){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)({}).hasOwnProperty.call(a,s)&&(c[s]=a[s])}return c},w.apply(null,arguments)}function R(c){const t=new Uint8Array(c);return window.btoa(String.fromCharCode(...t))}function B(c){const t=window.atob(c),a=t.length,s=new Uint8Array(a);for(let o=0;o<a;o++)s[o]=t.charCodeAt(o);return s.buffer}const O=new Blob([`
      const BIAS = 0x84;
      const CLIP = 32635;
      const encodeTable = [
        0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,
        4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
        5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
        5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7
      ];
      
      function encodeSample(sample) {
        let sign;
        let exponent;
        let mantissa;
        let muLawSample;
        sign = (sample >> 8) & 0x80;
        if (sign !== 0) sample = -sample;
        sample = sample + BIAS;
        if (sample > CLIP) sample = CLIP;
        exponent = encodeTable[(sample>>7) & 0xFF];
        mantissa = (sample >> (exponent+3)) & 0x0F;
        muLawSample = ~(sign | (exponent << 4) | mantissa);
        
        return muLawSample;
      }
    
      class RawAudioProcessor extends AudioWorkletProcessor {
        constructor() {
          super();
                    
          this.port.onmessage = ({ data }) => {
            this.buffer = []; // Initialize an empty buffer
            this.bufferSize = data.sampleRate / 4;
            
            if (globalThis.LibSampleRate && sampleRate !== data.sampleRate) {
              globalThis.LibSampleRate.create(1, sampleRate, data.sampleRate).then(resampler => {
                this.resampler = resampler;
              });
            } 
          };
        }
        process(inputs) {
          if (!this.buffer) {
            return true;
          }
          
          const input = inputs[0]; // Get the first input node
          if (input.length > 0) {
            let channelData = input[0]; // Get the first channel's data

            // Resample the audio if necessary
            if (this.resampler) {
              channelData = this.resampler.full(channelData);
            }

            // Add channel data to the buffer
            this.buffer.push(...channelData);
            // Get max volume 
            let sum = 0.0;
            for (let i = 0; i < channelData.length; i++) {
              sum += channelData[i] * channelData[i];
            }
            const maxVolume = Math.sqrt(sum / channelData.length);
            // Check if buffer size has reached or exceeded the threshold
            if (this.buffer.length >= this.bufferSize) {
              const float32Array = new Float32Array(this.buffer)
              let encodedArray = this.format === "ulaw"
                ? new Uint8Array(float32Array.length)
                : new Int16Array(float32Array.length);

              // Iterate through the Float32Array and convert each sample to PCM16
              for (let i = 0; i < float32Array.length; i++) {
                // Clamp the value to the range [-1, 1]
                let sample = Math.max(-1, Math.min(1, float32Array[i]));

                // Scale the sample to the range [-32768, 32767]
                let value = sample < 0 ? sample * 32768 : sample * 32767;
                if (this.format === "ulaw") {
                  value = encodeSample(Math.round(value));
                }

                encodedArray[i] = value;
              }

              // Send the buffered data to the main script
              this.port.postMessage([encodedArray, maxVolume]);

              // Clear the buffer after sending
              this.buffer = [];
            }
          }
          return true; // Continue processing
        }
      }
      registerProcessor("raw-audio-processor", RawAudioProcessor);
  `],{type:"application/javascript"}),P=URL.createObjectURL(O);function E(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}class b{static async create({sampleRate:t,format:a,preferHeadphonesForIosDevices:s}){let o=null,n=null;try{const r={sampleRate:{ideal:t},echoCancellation:{ideal:!0},noiseSuppression:{ideal:!0}};if(E()&&s){const m=(await window.navigator.mediaDevices.enumerateDevices()).find(v=>v.kind==="audioinput"&&["airpod","headphone","earphone"].find(f=>v.label.toLowerCase().includes(f)));m&&(r.deviceId={ideal:m.deviceId})}const u=navigator.mediaDevices.getSupportedConstraints().sampleRate;o=new window.AudioContext(u?{sampleRate:t}:{});const l=o.createAnalyser();u||await o.audioWorklet.addModule("https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js"),await o.audioWorklet.addModule(P),n=await navigator.mediaDevices.getUserMedia({audio:r});const g=o.createMediaStreamSource(n),p=new AudioWorkletNode(o,"raw-audio-processor");return p.port.postMessage({type:"setFormat",format:a,sampleRate:t}),g.connect(l),l.connect(p),await o.resume(),new b(o,l,p,n)}catch(r){var e,i;throw(e=n)==null||e.getTracks().forEach(u=>u.stop()),(i=o)==null||i.close(),r}}constructor(t,a,s,o){this.context=void 0,this.analyser=void 0,this.worklet=void 0,this.inputStream=void 0,this.context=t,this.analyser=a,this.worklet=s,this.inputStream=o}async close(){this.inputStream.getTracks().forEach(t=>t.stop()),await this.context.close()}}const q=new Blob([`
      const decodeTable = [0,132,396,924,1980,4092,8316,16764];
      
      export function decodeSample(muLawSample) {
        let sign;
        let exponent;
        let mantissa;
        let sample;
        muLawSample = ~muLawSample;
        sign = (muLawSample & 0x80);
        exponent = (muLawSample >> 4) & 0x07;
        mantissa = muLawSample & 0x0F;
        sample = decodeTable[exponent] + (mantissa << (exponent+3));
        if (sign !== 0) sample = -sample;

        return sample;
      }
      
      class AudioConcatProcessor extends AudioWorkletProcessor {
        constructor() {
          super();
          this.buffers = []; // Initialize an empty buffer
          this.cursor = 0;
          this.currentBuffer = null;
          this.wasInterrupted = false;
          this.finished = false;
          
          this.port.onmessage = ({ data }) => {
            switch (data.type) {
              case "setFormat":
                this.format = data.format;
                break;
              case "buffer":
                this.wasInterrupted = false;
                this.buffers.push(
                  this.format === "ulaw"
                    ? new Uint8Array(data.buffer)
                    : new Int16Array(data.buffer)
                );
                break;
              case "interrupt":
                this.wasInterrupted = true;
                break;
              case "clearInterrupted":
                if (this.wasInterrupted) {
                  this.wasInterrupted = false;
                  this.buffers = [];
                  this.currentBuffer = null;
                }
            }
          };
        }
        process(_, outputs) {
          let finished = false;
          const output = outputs[0][0];
          for (let i = 0; i < output.length; i++) {
            if (!this.currentBuffer) {
              if (this.buffers.length === 0) {
                finished = true;
                break;
              }
              this.currentBuffer = this.buffers.shift();
              this.cursor = 0;
            }

            let value = this.currentBuffer[this.cursor];
            if (this.format === "ulaw") {
              value = decodeSample(value);
            }
            output[i] = value / 32768;
            this.cursor++;

            if (this.cursor >= this.currentBuffer.length) {
              this.currentBuffer = null;
            }
          }

          if (this.finished !== finished) {
            this.finished = finished;
            this.port.postMessage({ type: "process", finished });
          }

          return true; // Continue processing
        }
      }

      registerProcessor("audio-concat-processor", AudioConcatProcessor);
    `],{type:"application/javascript"}),U=URL.createObjectURL(q);class k{static async create({sampleRate:t,format:a}){let s=null;try{s=new AudioContext({sampleRate:t});const n=s.createAnalyser(),e=s.createGain();e.connect(n),n.connect(s.destination),await s.audioWorklet.addModule(U);const i=new AudioWorkletNode(s,"audio-concat-processor");return i.port.postMessage({type:"setFormat",format:a}),i.connect(e),await s.resume(),new k(s,n,e,i)}catch(n){var o;throw(o=s)==null||o.close(),n}}constructor(t,a,s,o){this.context=void 0,this.analyser=void 0,this.gain=void 0,this.worklet=void 0,this.context=t,this.analyser=a,this.gain=s,this.worklet=o}async close(){await this.context.close()}}function x(c){return!!c.type}class S{static async create(t){let a=null;try{var s;const n=(s=t.origin)!=null?s:"wss://api.elevenlabs.io",e=t.signedUrl?t.signedUrl:n+"/v1/convai/conversation?agent_id="+t.agentId,i=["convai"];t.authorization&&i.push(`bearer.${t.authorization}`),a=new WebSocket(e,i);const r=await new Promise((v,f)=>{a.addEventListener("open",()=>{var d;const h={type:"conversation_initiation_client_data"};var I,F,D,M;t.overrides&&(h.conversation_config_override={agent:{prompt:(I=t.overrides.agent)==null?void 0:I.prompt,first_message:(F=t.overrides.agent)==null?void 0:F.firstMessage,language:(D=t.overrides.agent)==null?void 0:D.language},tts:{voice_id:(M=t.overrides.tts)==null?void 0:M.voiceId}}),t.customLlmExtraBody&&(h.custom_llm_extra_body=t.customLlmExtraBody),t.dynamicVariables&&(h.dynamic_variables=t.dynamicVariables),(d=a)==null||d.send(JSON.stringify(h))},{once:!0}),a.addEventListener("error",d=>{setTimeout(()=>f(d),0)}),a.addEventListener("close",f),a.addEventListener("message",d=>{const h=JSON.parse(d.data);x(h)&&(h.type==="conversation_initiation_metadata"?v(h.conversation_initiation_metadata_event):console.warn("First received message is not conversation metadata."))},{once:!0})}),{conversation_id:u,agent_output_audio_format:l,user_input_audio_format:g}=r,p=A(g??"pcm_16000"),m=A(l);return new S(a,u,p,m)}catch(n){var o;throw(o=a)==null||o.close(),n}}constructor(t,a,s,o){this.socket=void 0,this.conversationId=void 0,this.inputFormat=void 0,this.outputFormat=void 0,this.queue=[],this.disconnectionDetails=null,this.onDisconnectCallback=null,this.onMessageCallback=null,this.socket=t,this.conversationId=a,this.inputFormat=s,this.outputFormat=o,this.socket.addEventListener("error",n=>{setTimeout(()=>this.disconnect({reason:"error",message:"The connection was closed due to a socket error.",context:n}),0)}),this.socket.addEventListener("close",n=>{this.disconnect(n.code===1e3?{reason:"agent",context:n}:{reason:"error",message:n.reason||"The connection was closed by the server.",context:n})}),this.socket.addEventListener("message",n=>{try{const e=JSON.parse(n.data);if(!x(e))return;this.onMessageCallback?this.onMessageCallback(e):this.queue.push(e)}catch{}})}close(){this.socket.close()}sendMessage(t){this.socket.send(JSON.stringify(t))}onMessage(t){this.onMessageCallback=t,this.queue.forEach(t),this.queue=[]}onDisconnect(t){this.onDisconnectCallback=t,this.disconnectionDetails&&t(this.disconnectionDetails)}disconnect(t){var a;this.disconnectionDetails||(this.disconnectionDetails=t,(a=this.onDisconnectCallback)==null||a.call(this,t))}}function A(c){const[t,a]=c.split("_");if(!["pcm","ulaw"].includes(t))throw new Error(`Invalid format: ${c}`);const s=parseInt(a);if(isNaN(s))throw new Error(`Invalid sample rate: ${a}`);return{format:t,sampleRate:s}}const W={clientTools:{}},j={onConnect:()=>{},onDebug:()=>{},onDisconnect:()=>{},onError:()=>{},onMessage:()=>{},onModeChange:()=>{},onStatusChange:()=>{},onCanSendFeedbackChange:()=>{}};class C{static async startSession(t){const a=w({},W,j,t);a.onStatusChange({status:"connecting"}),a.onCanSendFeedbackChange({canSendFeedback:!1});let s=null,o=null,n=null,e=null;try{var i,r;e=await navigator.mediaDevices.getUserMedia({audio:!0});const f=(i=t.connectionDelay)!=null?i:{default:0,android:3e3};let d=f.default;var u;if(/android/i.test(navigator.userAgent))d=(u=f.android)!=null?u:d;else if(E()){var l;d=(l=f.ios)!=null?l:d}return d>0&&await new Promise(h=>setTimeout(h,d)),o=await S.create(t),[s,n]=await Promise.all([b.create(w({},o.inputFormat,{preferHeadphonesForIosDevices:t.preferHeadphonesForIosDevices})),k.create(o.outputFormat)]),(r=e)==null||r.getTracks().forEach(h=>h.stop()),e=null,new C(a,o,s,n)}catch(f){var g,p,m,v;throw a.onStatusChange({status:"disconnected"}),(g=e)==null||g.getTracks().forEach(d=>d.stop()),(p=o)==null||p.close(),await((m=s)==null?void 0:m.close()),await((v=n)==null?void 0:v.close()),f}}constructor(t,a,s,o){var n=this;this.options=void 0,this.connection=void 0,this.input=void 0,this.output=void 0,this.lastInterruptTimestamp=0,this.mode="listening",this.status="connecting",this.inputFrequencyData=void 0,this.outputFrequencyData=void 0,this.volume=1,this.currentEventId=1,this.lastFeedbackEventId=1,this.canSendFeedback=!1,this.endSession=()=>this.endSessionWithDetails({reason:"user"}),this.endSessionWithDetails=async function(e){n.status!=="connected"&&n.status!=="connecting"||(n.updateStatus("disconnecting"),n.connection.close(),await n.input.close(),await n.output.close(),n.updateStatus("disconnected"),n.options.onDisconnect(e))},this.updateMode=e=>{e!==this.mode&&(this.mode=e,this.options.onModeChange({mode:e}))},this.updateStatus=e=>{e!==this.status&&(this.status=e,this.options.onStatusChange({status:e}))},this.updateCanSendFeedback=()=>{const e=this.currentEventId!==this.lastFeedbackEventId;this.canSendFeedback!==e&&(this.canSendFeedback=e,this.options.onCanSendFeedbackChange({canSendFeedback:e}))},this.onMessage=async function(e){switch(e.type){case"interruption":e.interruption_event&&(n.lastInterruptTimestamp=e.interruption_event.event_id),n.fadeOutAudio();break;case"agent_response":n.options.onMessage({source:"ai",message:e.agent_response_event.agent_response});break;case"user_transcript":n.options.onMessage({source:"user",message:e.user_transcription_event.user_transcript});break;case"internal_tentative_agent_response":n.options.onDebug({type:"tentative_agent_response",response:e.tentative_agent_response_internal_event.tentative_agent_response});break;case"client_tool_call":if(n.options.clientTools.hasOwnProperty(e.client_tool_call.tool_name)){try{var i;const r=(i=await n.options.clientTools[e.client_tool_call.tool_name](e.client_tool_call.parameters))!=null?i:"Client tool execution successful.";n.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:r,is_error:!1})}catch(r){n.onError("Client tool execution failed with following error: "+(r==null?void 0:r.message),{clientToolName:e.client_tool_call.tool_name}),n.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:"Client tool execution failed: "+(r==null?void 0:r.message),is_error:!0})}break}if(n.options.onUnhandledClientToolCall){n.options.onUnhandledClientToolCall(e.client_tool_call);break}n.onError(`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,{clientToolName:e.client_tool_call.tool_name}),n.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,is_error:!0});break;case"audio":n.lastInterruptTimestamp<=e.audio_event.event_id&&(n.addAudioBase64Chunk(e.audio_event.audio_base_64),n.currentEventId=e.audio_event.event_id,n.updateCanSendFeedback(),n.updateMode("speaking"));break;case"ping":n.connection.sendMessage({type:"pong",event_id:e.ping_event.event_id});break;default:n.options.onDebug(e)}},this.onInputWorkletMessage=e=>{this.status==="connected"&&this.connection.sendMessage({user_audio_chunk:R(e.data[0].buffer)})},this.onOutputWorkletMessage=({data:e})=>{e.type==="process"&&this.updateMode(e.finished?"listening":"speaking")},this.addAudioBase64Chunk=e=>{this.output.gain.gain.value=this.volume,this.output.worklet.port.postMessage({type:"clearInterrupted"}),this.output.worklet.port.postMessage({type:"buffer",buffer:B(e)})},this.fadeOutAudio=()=>{this.updateMode("listening"),this.output.worklet.port.postMessage({type:"interrupt"}),this.output.gain.gain.exponentialRampToValueAtTime(1e-4,this.output.context.currentTime+2),setTimeout(()=>{this.output.gain.gain.value=this.volume,this.output.worklet.port.postMessage({type:"clearInterrupted"})},2e3)},this.onError=(e,i)=>{console.error(e,i),this.options.onError(e,i)},this.calculateVolume=e=>{if(e.length===0)return 0;let i=0;for(let r=0;r<e.length;r++)i+=e[r]/255;return i/=e.length,i<0?0:i>1?1:i},this.getId=()=>this.connection.conversationId,this.isOpen=()=>this.status==="connected",this.setVolume=({volume:e})=>{this.volume=e},this.getInputByteFrequencyData=()=>(this.inputFrequencyData!=null||(this.inputFrequencyData=new Uint8Array(this.input.analyser.frequencyBinCount)),this.input.analyser.getByteFrequencyData(this.inputFrequencyData),this.inputFrequencyData),this.getOutputByteFrequencyData=()=>(this.outputFrequencyData!=null||(this.outputFrequencyData=new Uint8Array(this.output.analyser.frequencyBinCount)),this.output.analyser.getByteFrequencyData(this.outputFrequencyData),this.outputFrequencyData),this.getInputVolume=()=>this.calculateVolume(this.getInputByteFrequencyData()),this.getOutputVolume=()=>this.calculateVolume(this.getOutputByteFrequencyData()),this.sendFeedback=e=>{this.canSendFeedback?(this.connection.sendMessage({type:"feedback",score:e?"like":"dislike",event_id:this.currentEventId}),this.lastFeedbackEventId=this.currentEventId,this.updateCanSendFeedback()):console.warn(this.lastFeedbackEventId===0?"Cannot send feedback: the conversation has not started yet.":"Cannot send feedback: feedback has already been sent for the current response.")},this.options=t,this.connection=a,this.input=s,this.output=o,this.options.onConnect({conversationId:a.conversationId}),this.connection.onDisconnect(this.endSessionWithDetails),this.connection.onMessage(this.onMessage),this.input.worklet.port.onmessage=this.onInputWorkletMessage,this.output.worklet.port.onmessage=this.onOutputWorkletMessage,this.updateStatus("connected")}}const $=T("ApiStore",()=>{const c=_({agentStatus:"disconnected",connected:!1}),t=L(),a=async i=>{var u;const r=(u=o.value.find(l=>l.gameIndex==i))==null?void 0:u.convoId;if(!r)return y({message:"Conversation does not exist... Aborted.",toastOps:{description:"Play the game before checking the results."},type:"error"})(),[];try{const l=await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${r}`,{method:"GET",headers:{"Content-Type":"application/json","xi-api-key":t.account.apiKey}});if(!l.ok)throw new Error("Failed to fetch conversation data");const p=(await l.json()).transcript.map(m=>m.message).filter(Boolean);return console.log("Transcript:",p),o.value=o.value.filter(m=>m.gameIndex!==i),y({message:"Results are out!!",toastOps:{description:"Click the chat icon to see the transcript of your talk!"},type:"success"})(),p}catch(l){console.error("Error fetching conversation data:",l),y({message:"Error fetching results",toastOps:{description:"Could not retrieve the conversation data."},type:"error"})()}},s=_(null),o=_([]);return{conversation:s,apiState:c,stopConversation:async()=>{var i;s!=null&&s&&(await((i=s.value)==null?void 0:i.endSession()),s.value=null,y({message:"Check your results!",toastOps:{description:'Navigate to the "Results" tab on the dashboard to see how well you did! '},type:"success"})())},startConversation:async(i,r)=>{y({message:"Starting the conversation!",toastOps:{description:"Enable your microphone and start speaking!"},type:"info"})();let u;try{await navigator.mediaDevices.getUserMedia({audio:!0}),s.value=await C.startSession({agentId:r,onConnect:()=>{u=setTimeout(()=>{var l;o.value.push({gameIndex:i,convoId:((l=s.value)==null?void 0:l.getId())??""}),console.log("conversation history id:",o.value)},2e3),c.value.connected=!0},onDisconnect:()=>{c.value.connected=!1},onError:l=>{console.error("Error:",l),clearTimeout(u)},onModeChange:l=>{c.value.agentStatus=l.mode==="speaking"?"speaking":"listening"}})}catch(l){console.error("Failed to start conversation:",l),clearTimeout(u),y({message:"Conversation Error",toastOps:{description:"Failed to start conversation:"},type:"error"})()}},conversationHistory:o,getResults:a}},{persist:{paths:["conversationHistory"]}});export{$ as u};
