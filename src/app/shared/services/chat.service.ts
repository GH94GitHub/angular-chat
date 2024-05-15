import { Injectable, OnDestroy, OnInit } from '@angular/core';
// @ts-ignore
import * as PubNub from 'pubnub';
import { ListenerType } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private readonly defaultChannel: string = "GLOBAL_CHAT";
  private readonly pubnub: any;

  constructor() {
    this.pubnub = new PubNub({
      publishKey: "pub-c-517c8188-d1f5-4866-8fc0-c24136b3a735",
      subscribeKey: "sub-c-00990dee-ce15-488d-935e-70a29ef3eddf",
      userId: "al234lk2j3-234234-l4uiy66h7j"
    });
    console.log("Pubnub Object Methods:", this.pubnub);
    this.init();
  }

  init(): void {
    this.subscribeTo(this.defaultChannel);
    // Add listener
    this.listen();
  }

  /**
   * Generic listeners
      // * Messages
      message: function (m) {
        const channelName = m.channel; // Channel on which the message was published
        const channelGroup = m.subscription; // Channel group or wildcard subscription match (if exists)
        const pubTT = m.timetoken; // Publish timetoken
        const msg = m.message; // Message payload
        const publisher = m.publisher; // Message publisher
      },
      // * Presence
      // requires a subscription with presence
      presence: function (p) {
        const action = p.action; // Can be join, leave, state-change, or timeout
        const channelName = p.channel; // Channel to which the message belongs
        const occupancy = p.occupancy; // Number of users subscribed to the channel
        const state = p.state; // User state
        const channelGroup = p.subscription; //  Channel group or wildcard subscription match, if any
        const publishTime = p.timestamp; // Publish timetoken
        const timetoken = p.timetoken; // Current timetoken
        const uuid = p.uuid; // UUIDs of users who are subscribed to the channel
      },
      // * Signals
      signal: function (s) {
        const channelName = s.channel; // Channel to which the signal belongs
        const channelGroup = s.subscription; // Channel group or wildcard subscription match, if any
        const pubTT = s.timetoken; // Publish timetoken
        const msg = s.message; // Payload
        const publisher = s.publisher; // Message publisher
      },
      // * App Context
      objects: (objectEvent) => {
        const channel = objectEvent.channel; // Channel to which the event belongs
        const channelGroup = objectEvent.subscription; // Channel group
        const timetoken = objectEvent.timetoken; // Event timetoken
        const publisher = objectEvent.publisher; // UUID that made the call
        const event = objectEvent.event; // Name of the event that occurred
        const type = objectEvent.type; // Type of the event that occurred
        const data = objectEvent.data; // Data from the event that occurred
      },
      // * Message Reactions
      messageAction: function (ma) {
        const channelName = ma.channel; // Channel to which the message belongs
        const publisher = ma.publisher; // Message publisher
        const event = ma.event; // Message action added or removed
        const type = ma.data.type; // Message action type
        const value = ma.data.value; // Message action value
        const messageTimetoken = ma.data.messageTimetoken; // Timetoken of the original message
        const actionTimetoken = ma.data.actionTimetoken; // Timetoken of the message action
      },
      // * File Sharing
      file: function (event) {
        const channelName = event.channel; // Channel to which the file belongs
        const channelGroup = event.subscription; // Channel group or wildcard subscription match (if exists)
        const publisher = event.publisher; // File publisher
        const timetoken = event.timetoken; // Event timetoken

        const message = event.message; // Optional message attached to the file
        const fileId = event.file.id; // File unique id
        const fileName = event.file.name;// File name
        const fileUrl = event.file.url; // File direct URL
      }
   */
  public listen(type?: ListenerType, callback: (event: any) => void = (event) => console.log(event)): void {
    if(!type) {
      this.pubnub.addListener({
        // Messages
        message: callback,
        // Presence
        presence: callback,
        // Signals
        signal: callback,
        // App Context
        objects: callback,
        // Message Reactions
        messageAction: callback,
        // File Sharing
        file: callback
      });
    return;
    }
    else {
      let listenerConfig: any = {};
      switch(type) {
        case ListenerType.MESSAGE:
          listenerConfig.message = callback;
          break;
        case ListenerType.SIGNAL:
          listenerConfig.signal = callback;
          break;
        case ListenerType.FILE:
          listenerConfig.file = callback;
          break;
        case ListenerType.MESSAGE_ACTION:
          listenerConfig.messageAction = callback;
          break;
        case ListenerType.OBJECTS:
          listenerConfig.objects = callback;
          break;
        case ListenerType.PRESENCE:
          listenerConfig.presence = callback;
          break;
      }
    }
  }

/**
 * @param title
 * @param message
 * @param channel
 * @returns {Function(status: any, response: any)}
 */
  public async publishMessage(
    title: string,
    message: string,
    channel: string = this.defaultChannel): Promise<PubNub.PublishResponse>
  {
    const publishPayload = {
      channel: channel,
      message: {
        title: title,
        message: message
      }
    }
      return await this.pubnub.publish(publishPayload);
  }

  public subscribeTo(channel: string): void {
    const isAlreadySubscribed = this.pubnub.getSubscribedChannels().includes(channel);
    if(!isAlreadySubscribed){
      this.pubnub.subscribe({
        channels: [channel],
        withPresence: true
      });
    }
  }

  public unsubscribe(channel: string): void {
    const isSubscribed = this.pubnub.getSubscribedChannels().includes(channel);
    if(isSubscribed) {
      this.pubnub.unsubscribe({
        channels: [channel]
      });
    }
  }

  ngOnDestroy(): void {
    this.pubnub.unsubscribeAll();
  }
}
