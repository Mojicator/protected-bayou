import mongoose from 'mongoose';

export default class Mongodb {
    public url: string;

    constructor(url: string) {
        this.url = url;
    }

    static init(url: string) {
        return new Mongodb(url);
    };

    mongoSetup(callback: (err: any) => void): void {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(this.url, callback);
    }
}