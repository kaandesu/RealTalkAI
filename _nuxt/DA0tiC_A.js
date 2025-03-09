import j from"./S3SovIEv.js";import{_ as N}from"./DsQPKsVf.js";import{c as C,_ as W}from"./CsryGnPg.js";import{u as $}from"./COSvnzSe.js";import{H as G,r as x,m as z,s as P,I as H,J as I,o as b,c as k,u as y,a as M,t as J,b as d,w,v as Z,d as F}from"./BF6vUdp5.js";import{_ as Q}from"./DlAUqK2U.js";import"./BJtpzMdQ.js";import"./-IQv0Xdc.js";function S(){return S=Object.assign?Object.assign.bind():function(c){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)({}).hasOwnProperty.call(s,a)&&(c[a]=s[a])}return c},S.apply(null,arguments)}function X(c){const t=new Uint8Array(c);return window.btoa(String.fromCharCode(...t))}function Y(c){const t=window.atob(c),s=t.length,a=new Uint8Array(s);for(let o=0;o<s;o++)a[o]=t.charCodeAt(o);return a.buffer}const K=new Blob([`
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
  `],{type:"application/javascript"}),ee=URL.createObjectURL(K);function U(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}class D{static async create({sampleRate:t,format:s,preferHeadphonesForIosDevices:a}){let o=null,n=null;try{const r={sampleRate:{ideal:t},echoCancellation:{ideal:!0},noiseSuppression:{ideal:!0}};if(U()&&a){const _=(await window.navigator.mediaDevices.enumerateDevices()).find(v=>v.kind==="audioinput"&&["airpod","headphone","earphone"].find(m=>v.label.toLowerCase().includes(m)));_&&(r.deviceId={ideal:_.deviceId})}const l=navigator.mediaDevices.getSupportedConstraints().sampleRate;o=new window.AudioContext(l?{sampleRate:t}:{});const p=o.createAnalyser();l||await o.audioWorklet.addModule("https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js"),await o.audioWorklet.addModule(ee),n=await navigator.mediaDevices.getUserMedia({audio:r});const g=o.createMediaStreamSource(n),h=new AudioWorkletNode(o,"raw-audio-processor");return h.port.postMessage({type:"setFormat",format:s,sampleRate:t}),g.connect(p),p.connect(h),await o.resume(),new D(o,p,h,n)}catch(r){var e,i;throw(e=n)==null||e.getTracks().forEach(l=>l.stop()),(i=o)==null||i.close(),r}}constructor(t,s,a,o){this.context=void 0,this.analyser=void 0,this.worklet=void 0,this.inputStream=void 0,this.context=t,this.analyser=s,this.worklet=a,this.inputStream=o}async close(){this.inputStream.getTracks().forEach(t=>t.stop()),await this.context.close()}}const te=new Blob([`
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
    `],{type:"application/javascript"}),ne=URL.createObjectURL(te);class A{static async create({sampleRate:t,format:s}){let a=null;try{a=new AudioContext({sampleRate:t});const n=a.createAnalyser(),e=a.createGain();e.connect(n),n.connect(a.destination),await a.audioWorklet.addModule(ne);const i=new AudioWorkletNode(a,"audio-concat-processor");return i.port.postMessage({type:"setFormat",format:s}),i.connect(e),await a.resume(),new A(a,n,e,i)}catch(n){var o;throw(o=a)==null||o.close(),n}}constructor(t,s,a,o){this.context=void 0,this.analyser=void 0,this.gain=void 0,this.worklet=void 0,this.context=t,this.analyser=s,this.gain=a,this.worklet=o}async close(){await this.context.close()}}function O(c){return!!c.type}class E{static async create(t){let s=null;try{var a;const n=(a=t.origin)!=null?a:"wss://api.elevenlabs.io",e=t.signedUrl?t.signedUrl:n+"/v1/convai/conversation?agent_id="+t.agentId,i=["convai"];t.authorization&&i.push(`bearer.${t.authorization}`),s=new WebSocket(e,i);const r=await new Promise((v,m)=>{s.addEventListener("open",()=>{var u;const f={type:"conversation_initiation_client_data"};var L,R,B,q;t.overrides&&(f.conversation_config_override={agent:{prompt:(L=t.overrides.agent)==null?void 0:L.prompt,first_message:(R=t.overrides.agent)==null?void 0:R.firstMessage,language:(B=t.overrides.agent)==null?void 0:B.language},tts:{voice_id:(q=t.overrides.tts)==null?void 0:q.voiceId}}),t.customLlmExtraBody&&(f.custom_llm_extra_body=t.customLlmExtraBody),t.dynamicVariables&&(f.dynamic_variables=t.dynamicVariables),(u=s)==null||u.send(JSON.stringify(f))},{once:!0}),s.addEventListener("error",u=>{setTimeout(()=>m(u),0)}),s.addEventListener("close",m),s.addEventListener("message",u=>{const f=JSON.parse(u.data);O(f)&&(f.type==="conversation_initiation_metadata"?v(f.conversation_initiation_metadata_event):console.warn("First received message is not conversation metadata."))},{once:!0})}),{conversation_id:l,agent_output_audio_format:p,user_input_audio_format:g}=r,h=V(g??"pcm_16000"),_=V(p);return new E(s,l,h,_)}catch(n){var o;throw(o=s)==null||o.close(),n}}constructor(t,s,a,o){this.socket=void 0,this.conversationId=void 0,this.inputFormat=void 0,this.outputFormat=void 0,this.queue=[],this.disconnectionDetails=null,this.onDisconnectCallback=null,this.onMessageCallback=null,this.socket=t,this.conversationId=s,this.inputFormat=a,this.outputFormat=o,this.socket.addEventListener("error",n=>{setTimeout(()=>this.disconnect({reason:"error",message:"The connection was closed due to a socket error.",context:n}),0)}),this.socket.addEventListener("close",n=>{this.disconnect(n.code===1e3?{reason:"agent",context:n}:{reason:"error",message:n.reason||"The connection was closed by the server.",context:n})}),this.socket.addEventListener("message",n=>{try{const e=JSON.parse(n.data);if(!O(e))return;this.onMessageCallback?this.onMessageCallback(e):this.queue.push(e)}catch{}})}close(){this.socket.close()}sendMessage(t){this.socket.send(JSON.stringify(t))}onMessage(t){this.onMessageCallback=t,this.queue.forEach(t),this.queue=[]}onDisconnect(t){this.onDisconnectCallback=t,this.disconnectionDetails&&t(this.disconnectionDetails)}disconnect(t){var s;this.disconnectionDetails||(this.disconnectionDetails=t,(s=this.onDisconnectCallback)==null||s.call(this,t))}}function V(c){const[t,s]=c.split("_");if(!["pcm","ulaw"].includes(t))throw new Error(`Invalid format: ${c}`);const a=parseInt(s);if(isNaN(a))throw new Error(`Invalid sample rate: ${s}`);return{format:t,sampleRate:a}}const se={clientTools:{}},ae={onConnect:()=>{},onDebug:()=>{},onDisconnect:()=>{},onError:()=>{},onMessage:()=>{},onModeChange:()=>{},onStatusChange:()=>{},onCanSendFeedbackChange:()=>{}};class T{static async startSession(t){const s=S({},se,ae,t);s.onStatusChange({status:"connecting"}),s.onCanSendFeedbackChange({canSendFeedback:!1});let a=null,o=null,n=null,e=null;try{var i,r;e=await navigator.mediaDevices.getUserMedia({audio:!0});const m=(i=t.connectionDelay)!=null?i:{default:0,android:3e3};let u=m.default;var l;if(/android/i.test(navigator.userAgent))u=(l=m.android)!=null?l:u;else if(U()){var p;u=(p=m.ios)!=null?p:u}return u>0&&await new Promise(f=>setTimeout(f,u)),o=await E.create(t),[a,n]=await Promise.all([D.create(S({},o.inputFormat,{preferHeadphonesForIosDevices:t.preferHeadphonesForIosDevices})),A.create(o.outputFormat)]),(r=e)==null||r.getTracks().forEach(f=>f.stop()),e=null,new T(s,o,a,n)}catch(m){var g,h,_,v;throw s.onStatusChange({status:"disconnected"}),(g=e)==null||g.getTracks().forEach(u=>u.stop()),(h=o)==null||h.close(),await((_=a)==null?void 0:_.close()),await((v=n)==null?void 0:v.close()),m}}constructor(t,s,a,o){var n=this;this.options=void 0,this.connection=void 0,this.input=void 0,this.output=void 0,this.lastInterruptTimestamp=0,this.mode="listening",this.status="connecting",this.inputFrequencyData=void 0,this.outputFrequencyData=void 0,this.volume=1,this.currentEventId=1,this.lastFeedbackEventId=1,this.canSendFeedback=!1,this.endSession=()=>this.endSessionWithDetails({reason:"user"}),this.endSessionWithDetails=async function(e){n.status!=="connected"&&n.status!=="connecting"||(n.updateStatus("disconnecting"),n.connection.close(),await n.input.close(),await n.output.close(),n.updateStatus("disconnected"),n.options.onDisconnect(e))},this.updateMode=e=>{e!==this.mode&&(this.mode=e,this.options.onModeChange({mode:e}))},this.updateStatus=e=>{e!==this.status&&(this.status=e,this.options.onStatusChange({status:e}))},this.updateCanSendFeedback=()=>{const e=this.currentEventId!==this.lastFeedbackEventId;this.canSendFeedback!==e&&(this.canSendFeedback=e,this.options.onCanSendFeedbackChange({canSendFeedback:e}))},this.onMessage=async function(e){switch(e.type){case"interruption":e.interruption_event&&(n.lastInterruptTimestamp=e.interruption_event.event_id),n.fadeOutAudio();break;case"agent_response":n.options.onMessage({source:"ai",message:e.agent_response_event.agent_response});break;case"user_transcript":n.options.onMessage({source:"user",message:e.user_transcription_event.user_transcript});break;case"internal_tentative_agent_response":n.options.onDebug({type:"tentative_agent_response",response:e.tentative_agent_response_internal_event.tentative_agent_response});break;case"client_tool_call":if(n.options.clientTools.hasOwnProperty(e.client_tool_call.tool_name)){try{var i;const r=(i=await n.options.clientTools[e.client_tool_call.tool_name](e.client_tool_call.parameters))!=null?i:"Client tool execution successful.";n.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:r,is_error:!1})}catch(r){n.onError("Client tool execution failed with following error: "+(r==null?void 0:r.message),{clientToolName:e.client_tool_call.tool_name}),n.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:"Client tool execution failed: "+(r==null?void 0:r.message),is_error:!0})}break}if(n.options.onUnhandledClientToolCall){n.options.onUnhandledClientToolCall(e.client_tool_call);break}n.onError(`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,{clientToolName:e.client_tool_call.tool_name}),n.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,is_error:!0});break;case"audio":n.lastInterruptTimestamp<=e.audio_event.event_id&&(n.addAudioBase64Chunk(e.audio_event.audio_base_64),n.currentEventId=e.audio_event.event_id,n.updateCanSendFeedback(),n.updateMode("speaking"));break;case"ping":n.connection.sendMessage({type:"pong",event_id:e.ping_event.event_id});break;default:n.options.onDebug(e)}},this.onInputWorkletMessage=e=>{this.status==="connected"&&this.connection.sendMessage({user_audio_chunk:X(e.data[0].buffer)})},this.onOutputWorkletMessage=({data:e})=>{e.type==="process"&&this.updateMode(e.finished?"listening":"speaking")},this.addAudioBase64Chunk=e=>{this.output.gain.gain.value=this.volume,this.output.worklet.port.postMessage({type:"clearInterrupted"}),this.output.worklet.port.postMessage({type:"buffer",buffer:Y(e)})},this.fadeOutAudio=()=>{this.updateMode("listening"),this.output.worklet.port.postMessage({type:"interrupt"}),this.output.gain.gain.exponentialRampToValueAtTime(1e-4,this.output.context.currentTime+2),setTimeout(()=>{this.output.gain.gain.value=this.volume,this.output.worklet.port.postMessage({type:"clearInterrupted"})},2e3)},this.onError=(e,i)=>{console.error(e,i),this.options.onError(e,i)},this.calculateVolume=e=>{if(e.length===0)return 0;let i=0;for(let r=0;r<e.length;r++)i+=e[r]/255;return i/=e.length,i<0?0:i>1?1:i},this.getId=()=>this.connection.conversationId,this.isOpen=()=>this.status==="connected",this.setVolume=({volume:e})=>{this.volume=e},this.getInputByteFrequencyData=()=>(this.inputFrequencyData!=null||(this.inputFrequencyData=new Uint8Array(this.input.analyser.frequencyBinCount)),this.input.analyser.getByteFrequencyData(this.inputFrequencyData),this.inputFrequencyData),this.getOutputByteFrequencyData=()=>(this.outputFrequencyData!=null||(this.outputFrequencyData=new Uint8Array(this.output.analyser.frequencyBinCount)),this.output.analyser.getByteFrequencyData(this.outputFrequencyData),this.outputFrequencyData),this.getInputVolume=()=>this.calculateVolume(this.getInputByteFrequencyData()),this.getOutputVolume=()=>this.calculateVolume(this.getOutputByteFrequencyData()),this.sendFeedback=e=>{this.canSendFeedback?(this.connection.sendMessage({type:"feedback",score:e?"like":"dislike",event_id:this.currentEventId}),this.lastFeedbackEventId=this.currentEventId,this.updateCanSendFeedback()):console.warn(this.lastFeedbackEventId===0?"Cannot send feedback: the conversation has not started yet.":"Cannot send feedback: feedback has already been sent for the current response.")},this.options=t,this.connection=s,this.input=a,this.output=o,this.options.onConnect({conversationId:s.conversationId}),this.connection.onDisconnect(this.endSessionWithDetails),this.connection.onMessage(this.onMessage),this.input.worklet.port.onmessage=this.onInputWorkletMessage,this.output.worklet.port.onmessage=this.onOutputWorkletMessage,this.updateStatus("connected")}}const oe=G("ApiStore",()=>{const c=x({agentStatus:"disconnected",connected:!1}),t=x(null),s=x([]);return{conversation:t,apiState:c,stopConversation:async()=>{var n;t!=null&&t&&(await((n=t.value)==null?void 0:n.endSession()),t.value=null,C({message:"Check your results!",toastOps:{description:'Navigate to the "Results" tab on the dashboard to see how well you did! '},type:"success"})())},startConversation:async n=>{C({message:"Starting the conversation!",toastOps:{description:"Enable your microphone and start speaking!"},type:"success"})();let e;try{await navigator.mediaDevices.getUserMedia({audio:!0}),t.value=await T.startSession({agentId:"3VjJuSeZFAZLux3QD7H1",onConnect:()=>{e=setTimeout(()=>{var i;s.value.push({gameIndex:n,convoId:((i=t.value)==null?void 0:i.getId())??""}),console.log("conversation history id:",s.value)},2e3),c.value.connected=!0},onDisconnect:()=>{c.value.connected=!1},onError:i=>{console.error("Error:",i),clearTimeout(e)},onModeChange:i=>{c.value.agentStatus=i.mode==="speaking"?"speaking":"listening"}})}catch(i){console.error("Failed to start conversation:",i),clearTimeout(e),C({message:"Converstaion Error",toastOps:{description:"Failed to start conversation:"},type:"error"})()}},conversationHistory:s}},{persist:{paths:["conversationHistory"]}}),ie={class:"box-border h-full w-full p-6"},re={key:0,class:"flex justify-between"},le={class:"text-bold hidden text-xl lg:block"},ce={class:"flex flex-wrap items-center justify-center gap-x-3 gap-y-2"},ue={key:1},de={key:2,id:"myEmbeddedScene"},pe=z({__name:"game",setup(c){const t=$(),s=oe(),{apiState:a}=P(s),o=x(!1);H(()=>o.value=!0);const{levels:n,state:e}=P(t),i=()=>{const r=document.querySelector("a-scene");r&&r.enterVR?r.enterVR():console.warn("VR mode is not supported or A-Frame not found.")};return(r,l)=>{const p=j,g=N,h=W,_=I("a-sky"),v=I("a-entity"),m=I("a-scene");return b(),k("main",ie,[y(e).aciveGameIndex!=-1?(b(),k("section",re,[M("div",le," Level - "+J(y(n)[y(e).aciveGameIndex].name),1),M("div",ce,[d(h,{onClick:l[0]||(l[0]=u=>y(s).startConversation(0)),disabled:y(a).connected,class:"flex items-center justify-center gap-x-2 rounded-sm px-3 sm:px-4 md:px-5 lg:px-6"},{default:w(()=>[d(p,{name:"material-symbols:play-arrow-rounded",class:"h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"}),d(g,{class:"hidden pr-3 sm:block md:pr-4 lg:pr-5"},{default:w(()=>l[2]||(l[2]=[F(" Start Conversation ")])),_:1})]),_:1},8,["disabled"]),d(h,{variant:"outline",onClick:l[1]||(l[1]=u=>y(s).stopConversation()),disabled:!y(a).connected,class:"flex items-center justify-center gap-x-2 rounded-sm px-3 sm:px-4 md:px-5 lg:px-6"},{default:w(()=>[d(p,{name:"material-symbols:play-arrow-rounded",class:"h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"}),d(g,{class:"hidden pr-3 sm:block md:pr-4 lg:pr-5"},{default:w(()=>l[3]||(l[3]=[F(" Stop Conversation ")])),_:1})]),_:1},8,["disabled"]),d(h,{onClick:i,variant:"secondary",class:"flex items-center justify-center gap-x-2 rounded-sm px-3 sm:px-4 md:px-5 lg:px-6"},{default:w(()=>[d(p,{name:"streamline:vr-headset-1",class:"h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"}),d(g,{class:"hidden pr-3 sm:block md:pr-4 lg:pr-5"},{default:w(()=>l[4]||(l[4]=[F("Fullscreen / VR")])),_:1})]),_:1})])])):(b(),k("section",ue,' There is no game here, go "levels" to select one. ')),l[5]||(l[5]=M("br",null,null,-1)),y(e).aciveGameIndex!=-1&&y(o)?(b(),k("div",de,[d(m,{id:"ascene",light:"defaultLightsEnabled: true",renderer:"colorManagement: true;",embedded:""},{default:w(()=>[d(_,{src:"sky2.jpg"}),d(v,{id:"myModel",position:"3.443 0.42 6.557",shadow:"cast: false","gltf-model":"people-at-restaurant-street/source/XYZ Game Ready - People at Restaurant Street Mod.glb","animation-mixer":"clip: Take 001; loop: true"}),d(v,{id:"myModel2",position:"1.184 0.45 -1.107",scale:"0.5 0.5 0.5",rotation:"0 -30 0",shadow:"cast: false","gltf-model":"indian_office_woman.glb","animation-mixer":"clip: mixamo.com; loop: true"})]),_:1})])):Z("",!0)])}}}),be=Q(pe,[["__scopeId","data-v-aeaf716e"]]);export{be as default};
