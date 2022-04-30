const { writeToFile } = require("../private/js/writeFile");
const {vol, fs} = require("memfs");



describe("Testing of writefile function",  () => {

    test("Should write to file successfully, returing true", async () =>{
        const path = "./private/files/writeTest.txt";
        const res = await writeToFile(path, "test");
        expect(res).toBe(true);
    });

    test("Should fail writing to a file, because it is in read-only mode", async () => {
        const path = "./private/files/writeTst.txt";
        await fs.chmod(path, 0o400, async () => {
            const res = await writeToFile(path, "test");
            expect(res).toBe(false);
        });
    })

})