export interface From {
  Relays?: any;
  Mailbox: string;
  Domain: string;
  Params: string;
}

export interface To {
  Relays?: any;
  Mailbox: string;
  Domain: string;
  Params: string;
}

export interface Headers {
  'Content-Type': string[];
  Date: string[];
  From: string[];
  'MIME-Version': string[];
  'Message-ID': string[];
  Received: string[];
  'Return-Path': string[];
  Subject: string[];
  To: string[];
  'Content-Transfer-Encoding': string[];
}

export interface Content {
  Headers: Headers;
  Body: string;
  Size: number;
  MIME?: any;
}

export interface Headers2 {
  'Content-Type': string[];
}

export interface Headers3 {
  'Content-Transfer-Encoding': string[];
  'Content-Type': string[];
}

export interface Headers4 {
  'Content-Transfer-Encoding': string[];
  'Content-Type': string[];
  'Content-ID': string[];
}

export interface Part3 {
  Headers: Headers4;
  Body: string;
  Size: number;
  MIME?: any;
}

export interface MIME3 {
  Parts: Part3[];
}

export interface Part2 {
  Headers: Headers3;
  Body: string;
  Size: number;
  MIME: MIME3;
}

export interface MIME2 {
  Parts: Part2[];
}

export interface Part {
  Headers: Headers2;
  Body: string;
  Size: number;
  MIME: MIME2;
}

export interface MIME {
  Parts: Part[];
}

export interface Raw {
  From: string;
  To: string[];
  Data: string;
  Helo: string;
}

export interface MailHogMessage {
  ID: string;
  From: From;
  To: To[];
  Content: Content;
  Created: string;
  MIME: MIME;
  Raw: Raw;
}
