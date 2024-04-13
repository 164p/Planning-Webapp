export async function uploadImages(files: any) {
    const formData = new FormData();
    
    formData.append('file', files);
    formData.append('uploadType', "0");

    const response = await fetch('https://up.m1r.ai/upload', {
        method: 'post',
        body: formData,
    })

    return response.json()
}