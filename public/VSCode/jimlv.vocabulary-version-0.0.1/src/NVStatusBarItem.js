const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

class NVStatusBarItem {
	constructor() {
		this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -90);
		this._statusBarItem.show();
		this.dist = [];

		// this._interval = setInterval(() => this.refreshUI(), 10 * 1000);

		this.getdist();
		this.getWord();
	}
	dispose() {
		this._statusBarItem.dispose();
		clearInterval(this._interval);
	}
	getdist() {
		const txt_dir = resolve('./src/resource/json/system.txt');
		const txt_con = fs.readFileSync(txt_dir, 'utf8');
		this.dist = txt_con.split('\n').map(line=>{
			line = line.split('\t');
			return {
				index: line[0],
				origin: line[1],
				target: line[2],
				dict: line[3],
				direct: line[4],
				time: line[5],
			}
		});
		console.log('getdist',this.dist);
	}
	getWord() {
		const random = Math.ceil(Math.random() * this.dist.length);
		const curWord = this.dist[random]

		this._statusBarItem.text = curWord.origin + curWord.target;
    	this._statusBarItem.tooltip = curWord.dict.replace(/\s/g,',');
		this._statusBarItem.command = 'extension.getWord';
		console.log('getWord',curWord.origin);
		return curWord;
	}
}
const StatusBar = new NVStatusBarItem();
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.getWord', () => {
		vscode.window.showInformationMessage(StatusBar.getWord().dict);
    }));
};