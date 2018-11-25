'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = true;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let commands = new Map();

    return {

        addCommand: function (event, context, handlerData) {
            if (!commands.has(event)) {
                commands.set(event, new Map());
            }
            if (!commands.get(event).has(context)) {
                commands.get(event).set(context, []);
            }
            commands
                .get(event)
                .get(context)
                .push(handlerData);
        },

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */

        on: function (event, context, handler) {
            this.addCommand(
                event,
                context,
                { handler, times: Infinity, frequency: 1, count: 0 });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */

        off: function (event, context) {
            Array.from(commands.keys()).forEach(key => {
                if (key === event || key.startsWith(event + '.')) {
                    commands.get(key).delete(context);
                }
            });

            return this;
        },

        getEvent: function (event) {
            commands.get(event).forEach((actions, student) => {
                actions.forEach(handlerData => {
                    const { handler, times, frequency, count } = handlerData;
                    if (count < times && count % frequency === 0) {
                        handler.call(student);
                    }
                    handlerData.count ++;
                });
            });
        },

        /**
         * Уведомить о событии
         * @param {String} event
         */

        emit: function (event) {
            while (event !== '') {
                if (commands.has(event)) {
                    this.getEvent(event);
                }
                event = event.substring(0, event.lastIndexOf('.'));
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */

        several: function (event, context, handler, times) {
            if (times <= 0) {
                times = Infinity;
            }
            this.addCommand(event, context, { handler, times, frequency: 1, count: 0 });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */

        through: function (event, context, handler, frequency) {
            if (frequency <= 0) {
                frequency = 1;
            }
            this.addCommand(
                event,
                context,
                { handler, times: Infinity, frequency, count: 0 });

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
