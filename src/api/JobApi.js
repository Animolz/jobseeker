import AxiosClient from "./AxiosClient";

const JobApi = {
    async getAll(params) {
        const response = await AxiosClient.post('company/api/job/get', 
            {
                ...params,
            }
        );
        return response;
    },

    async getList() {
        const response = await AxiosClient.get('company/api/job/get-list');
        return response;
    },

    async getById(id) {
        const response = await AxiosClient.get(`company/api/job/${id}`)
        return response
    },

    add(data) {
        const url = `/company/api/job/`;
        return AxiosClient.post(url, data);
    },

    update(data) {
        const url = `/company/api/job/${data.id}/`;
        return AxiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/company/api/job/${id}/`;
        return AxiosClient.delete(url);
    },

    async getCandidates(id) {
        const response = await AxiosClient.get(`/company/api/apply-job/${id}/candidates`);
        return response;
    }

}

export default JobApi