import 'egg';
import { EggSocketIO, EggSocketNameSpace } from 'egg';

declare module 'egg' {
    interface Application {
        jwt: any;
        io: Server & EggSocketIO & EggSocketNameSpace
    }
    interface Context {
        socket: Socket
    }

    interface EggSocketIO {
        middleware: xxx;
        controller: xxx;
    }

    interface Namespace {
        route(event: string, handler: Function): any
    }
}