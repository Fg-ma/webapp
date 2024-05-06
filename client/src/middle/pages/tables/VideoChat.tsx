import { useTableSocketContext } from "@context/TableSocketContext";
import React, { useEffect, useRef, useState } from "react";

interface RemoteStream {
  stream: MediaStream;
  id: string;
}

interface VideoChatProps {
  table_id: string;
}

export default function VideoChat({ table_id }: VideoChatProps) {
  const { tableSocket } = useTableSocketContext();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const token = localStorage.getItem("token");
  console.log(peerConnections);
  useEffect(() => {
    // Get local media stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        // Handle incoming calls
        tableSocket.on("call-offer", handleCallOffer);
        tableSocket.on("call-answer", handleCallAnswer);
        tableSocket.on("ice-candidate", handleIceCandidate);

        createOffer();
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  }, []);

  async function createOffer() {
    const peerConnection = new RTCPeerConnection();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    tableSocket.emit("offer-to-all", token, table_id, offer);
  }

  const handleCallOffer = async (offerData: any) => {
    const { from, offer } = offerData;
    const peerConnection = new RTCPeerConnection();

    // Add local stream to peer connection if video is on
    if (isVideoOn && localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    // Set remote description
    await peerConnection.setRemoteDescription(offer);

    // Create answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Send answer to caller
    tableSocket.emit("call-answer", token, table_id, from, answer);

    // Listen for ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send ICE candidate to caller
        tableSocket.emit("ice-candidate", token, table_id, {
          from,
          candidate: event.candidate,
        });
      }
    };

    // Set remote video stream for dynamically added tracks
    peerConnection.ontrack = (event) => {
      setRemoteStreams((prevStreams) => [
        ...prevStreams,
        { stream: event.streams[0], id: from },
      ]);
    };

    // Store the peer connection
    peerConnections.current[from] = peerConnection;
  };

  const handleCallAnswer = async (answerData: any) => {
    const { from, answer } = answerData;
    const peerConnection = peerConnections.current[from];
    if (peerConnection) {
      await peerConnection.setRemoteDescription(answer);
    }
  };

  const handleIceCandidate = async (candidateData: any) => {
    const { from, candidate } = candidateData;
    const peerConnection = peerConnections.current[from];
    if (peerConnection) {
      await peerConnection.addIceCandidate(candidate);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOn(!isVideoOn);
    }
  };

  return (
    <div>
      <h1>WebRTC Video Chat</h1>
      <div>
        {localStream && (
          <video
            autoPlay
            muted
            ref={(ref) => {
              if (ref) {
                ref.srcObject = localStream;
              }
            }}
            style={{ width: "200px", marginRight: "20px" }}
          />
        )}
        {remoteStreams.map((remoteStream) => (
          <video
            key={remoteStream.id}
            autoPlay
            ref={(ref) => {
              if (ref) {
                ref.srcObject = remoteStream.stream;
              }
            }}
            style={{ width: "200px", marginRight: "20px" }}
          />
        ))}
      </div>
      <button onClick={toggleVideo}>
        {isVideoOn ? "Turn Off Video" : "Turn On Video"}
      </button>
    </div>
  );
}
