import React, {useCallback, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Table
} from "reactstrap";

const Geologie = ()=> {
    const [geologieList, setGeologieList] = useState([]);
    const [objetGeologie, setObjetGeologie] = useState([])
    const [modalDialog, setModalDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setGeologieList([{
            id: '01', description: "bla bla bal",
            lithologie: "bla bla bal", groupe: "bla bla bal"
        }]);
    }, []);

    // fonction permetant d'appler notre modale
    // si modal est ouvert le fermer et mettre notre objet a null
    // sinon l'ouvrire
    const toggle = useCallback(() => {
        if (modalDialog) {
            setModalDialog(false);
            setObjetGeologie({});
        } else {
            setModalDialog(true);
        }
    }, [modalDialog]);

    // la fonction ajouter nouveau element
        const handleAddClicks = () => {
            setObjetGeologie({});
            setModalDialog(!modalDialog)
            setIsEdit(false);
            toggle();
        };

    // Le dialoge de mise jour
    const handleUpdateClick = useCallback((arg) => {
        const obj = arg;
        setObjetGeologie({
            id: obj.id,
            description: obj.description,
            lithologie: obj.lithologie,
            groupe: obj.groupe
        });
        setIsEdit(true); // mettre edit a tru pour dire que c'est modification
        toggle(); // la fonction toogle appeler pour ouvrire notre popup
    }, [toggle]);

    function handleSubmit() {
        if (objetGeologie.lithologie !== undefined) {
            setGeologieList([...geologieList, objetGeologie]);
            toggle();
        } else {
            alert("La ne doiveent pas être null !")
        }
    }

    function handleDelete(item) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
            console.log(item);
        }
    }

    return (
        <>
            <Container>
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <h5 className="card-title mb-0 flex-grow-1">Gestion des Geologies</h5>
                            <div className="flex-shrink-0">
                                <button
                                    type="button"
                                    className="btn btn-success add-btn"
                                    id="create-btn"
                                    onClick={() => handleAddClicks()} > Ajouter
                                </button>{" "}
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <Table striped border>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Lithologie</th>
                                    <th>Groupe</th>
                                    <th>Description</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {geologieList.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.lithologie}</td>
                                        <td>{item.groupe}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <div className="text-center">
                                                <Button color="success" size="sm" className="me-1"
                                                        onClick={() => {
                                                            handleUpdateClick(item);
                                                        }}>Modifier</Button>
                                                <Button color="danger" size="sm"
                                                        onClick={() => {
                                                            handleDelete(item);
                                                        }}>Supprimer</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </Container>
            <Modal id="createForm" isOpen={modalDialog} toggle={toggle} modalClassName="zoomIn" centered tabIndex="-1">
                <ModalHeader toggle={toggle} className="p-3 bg-soft-success"> {!!isEdit ? "Modification d'une géologie" : "Création d'une géologie"} </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="groupe-input" className="form-label">Groupe</label>
                            <Input
                                id="goupe-input"
                                name="groupe"
                                className="form-control"
                                type="text"
                                placeholder="Exe: ...."
                                value={objetGeologie.groupe}
                                onChange={(e) => setObjetGeologie({
                                    ...objetGeologie,
                                    groupe: e.target.value
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lithologie-input" className="form-label">Lithologie</label>
                            <Input
                                id="lithologie-input"
                                name="lithologie"
                                className="form-control"
                                type="text"
                                placeholder="Exe: ..."
                                value={objetGeologie.lithologie}
                                onChange={(e) => setObjetGeologie({
                                    ...objetGeologie,
                                    lithologie: e.target.value
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description-input" className="form-label">Description</label>
                            <Input
                                id="description-input"
                                name="description"
                                className="form-control"
                                type="textarea"
                                placeholder="Ex: La description"
                                value={objetGeologie.description}
                                onChange={(e) => setObjetGeologie({
                                    ...objetGeologie,
                                    description: e.target.value
                                })}
                            />
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                            <Button color="primary" outline onClick={() => setModalDialog(false)}>
                                Fermer
                            </Button>
                            <Button color="success" id="addGeologie" onClick={()=> handleSubmit() }>
                                {!isEdit ? "Enregistrer" : "Modifier"}
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )

}
export default Geologie;