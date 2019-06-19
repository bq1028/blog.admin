/**
 * 扫描
 * @author Philip
 */
const net = require('net')
const ports = []

module.exports = (host) => {
	let startTime = new Date()
	let result = []

	for (let i = 0, len = ports.length; i <= len; i ++) {
        let port = ports[i]

		let connect = net.connect({
				host,
				port
			}, function () {
                this.destroy()
            })

        connect.on('error', function (err) {
			if (err.errno == 'ECONNREFUSED') {
				this.destroy()
			}
		})

		connect.on('close', function () {
			if (!count --) {
				callback(result)
			}
		})
	}
}
