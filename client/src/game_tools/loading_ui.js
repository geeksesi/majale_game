function loading_start(my_this) {
    my_this.distance = my_this.sys.game.config.width / 610;

    my_this.loading_ui = my_this.add.sprite(
        300 * my_this.distance,
        500 * my_this.distance,
        'loading'
    )
        .setScale(my_this.distance)

    my_this.angel_loading = setInterval(() => {
        my_this.loading_ui.angle -= 2
    }, 1000 / 30)

}

function loading_stop(my_this) {
    clearInterval(my_this.angel_loading);
    my_this.loading_ui.destroy();
}

export {
    loading_start,
    loading_stop,
}