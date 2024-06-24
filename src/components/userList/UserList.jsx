import React from 'react'

const UserList = () => {
  return (
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Име</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Имейл</th>
                <th scope="col">Роля</th>
                <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>юзър</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-warning btn-sm me-1">Деактивирай</button>
                      <button className="btn btn-primary btn-sm">Редактирай</button>
                    </div>
                  </td>
                </tr>
                <tr>
                <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>юзър</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-warning btn-sm me-1">Деактивирай</button>
                      <button className="btn btn-primary btn-sm">Редактирай</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                  <td>юзър</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-warning btn-sm me-1">Деактивирай</button>
                      <button className="btn btn-primary btn-sm">Редактирай</button>
                    </div>
                  </td>
                </tr>
            </tbody>

        </table>

    </div>
  )
}

export default UserList;