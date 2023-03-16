export class SocketQueue {
    private static queue: Array<() => Promise<void>> = [];

    public static async push(fn: () => Promise<void>): Promise<void> {
        this.queue.push(fn);
        console.log(this.queue);
    }

    public static async run(): Promise<void> {
        const fn = this.queue.shift();

        if (fn) await fn();
    }
}
