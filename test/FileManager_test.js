const FileManager = artifacts.require("FileManager");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('FileManager',(accounts)=>{
	let fileManager

	before(async()=>{
		fileManager=await FileManager.deployed()
		
	})


	describe('deployment',async()=>{
		
		it('deploys successfully',async()=>{
			const address=fileManager.address
			console.log(address)
			assert.notEqual(address,0x0)
			assert.notEqual(address,'')
			assert.notEqual(address,null)
			assert.notEqual(address,undefined)

		})
	})

	describe('stroage',async()=>{
		
		it('update the hash',async()=>{
			let hash
		    hash='0x6E19ceeba0e43FCcFeF50bB9EBe953eDd58D8fF6'
			await fileManager.set(hash)
			const result=await fileManager.get(hash)
			//assert.equal(result[0].hash,hash)
		
		})
	})

	describe('showHash',async()=>{
		
		it('show the hash',async()=>{
			let hash
		    hash='0x6E19ceeba0e43FCcFeF50bB9EBe953eDd58D8fF6'
			const result=await fileManager.get(hash)
			console.log(result)
		
		})
	})
		
})