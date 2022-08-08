import SockJS from "sockjs-client";

import Stomp from "stompjs";

import { Observable, Subscriber } from "rxjs";

let subscriber: Subscriber<any>;
let connection: Promise<any>;
let connectedPromise: any = null;
let listener: Observable<any>;
let listenerObserver: Subscriber<any>;
let alreadyConnectedOnce = false;

export let stompClient: any;

export const PRIVATE_NOTIFICATION_TOPIC =
  "/user/queue/topic/private-notifications";

const createConnection = (): Promise<any> =>
  new Promise((resolve) => (connectedPromise = resolve));

const createListener = (): Observable<any> => {
  return new Observable((observer) => {
    listenerObserver = observer;
  });
};

export const createStompClient = (idUser: number) => {
  const socket = new SockJS(
    process.env.NEXT_PUBLIC_WEB_SOCKET_URL + "?idUser=" + idUser
  );

  return Stomp.over(socket);
};

export const connect = (idUser: number) => {
  if (connectedPromise !== null || alreadyConnectedOnce) {
    return;
  }

  connection = createConnection();
  listener = createListener();

  stompClient = createStompClient(idUser);
  stompClient.debug = null;
  stompClient.connect({}, () => {
    connectedPromise("success");
    connectedPromise = null;
    alreadyConnectedOnce = true;

    subscribe(PRIVATE_NOTIFICATION_TOPIC);
  });

  return stompClient;
};

export const receiveWebSocketMessage = () => listener;

export const subscribe = (topic: string) => {
  listener = createListener();
  connection.then(() => {
    subscriber = stompClient.subscribe(topic, (payload: any) => {
      listenerObserver?.next(JSON.parse(payload.body));
    });
  });
};

export const disconnect = () => {
  if (stompClient !== null) {
    if (stompClient.connected) {
      stompClient.disconnect();
    }
    stompClient = null;
  }
  alreadyConnectedOnce = false;
};

export const unsubscribe = () => {
  if (subscriber !== null) {
    subscriber.unsubscribe();
  }
};
