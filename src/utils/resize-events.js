import { nanoid } from 'nanoid/non-secure';

class OnResize {
  constructor (delay) {
    this.events = [];

    this.executeEvents = () => {
      this.resizeTaskId = undefined;

      this.events.forEach(event => {
        event.callback();
      });
    };

    this.resizeTask = event => {
      if (this.resizeTaskId) {
        return;
      }

      this.resizeTaskId = setTimeout(this.executeEvents, delay);
    };

    window.addEventListener('resize', this.resizeTask, false);
  }

  addEvent (event) {
    const idEvent = nanoid();

    this.events.push({
      id: idEvent,
      callback: event
    });

    return idEvent;
  }

  removeEvent (idEvent) {
    const index = this.events.findIndex(event => event.id === idEvent);

    this.events.splice(index, 1);
  }
}

const resizeSingleton = new OnResize(500);

export default resizeSingleton;
