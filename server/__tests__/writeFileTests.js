const { writeToFile } = require("../private/js/writeFile");
const mock = require("mock-fs");



describe("Testing of writefile function",  () => {

    test("Should write to file successfully, returing true", async () =>{
        const path = "./private/files/writeTest.txt";
        const res = await writeToFile(path, "test");
        expect(res).toBe(true);
    });

    test("Should fail writing to a file, because it is in read-only mode", async () => {
        mock({
            '/test.txt': mock.file({
                mode: 0o444,
                content: 'test'
            })
            
        })

        const res = await writeToFile('/test.txt', "test");
        expect(res).toBe(false);
        mock.restore()
    })

})