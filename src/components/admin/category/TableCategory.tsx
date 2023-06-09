import { Box, Typography , LinearProgress} from '@mui/material'
import { DataGrid , GridColDef, GridCellParams,  GridToolbar, GridLocaleText} from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect } from 'react';
import { getCategories } from '../../../store/slices/admin/thunk';
import { DeleteCategoryButton , EditCategoryButton} from './';
import { setActiveCategory } from '../../../store/slices/admin/adminSlice';




export const TableCategory = () => {

    const {categories} = useAppSelector(state => state.admin);
    const  dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategories());
    },[])

    const handleSelectCategory= (event: React.MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.getAttribute("data-id");
        const category = categories.find((p) => p._id === id)!;
        dispatch(setActiveCategory(category));
    }

    const handleClearCategorySelected= () => {
        dispatch(setActiveCategory(null));
    }

    const columns:GridColDef[] = [
        {field: 'categoryName', headerName: "Nombre de la categoría", flex: 1 , minWidth: 150  , renderCell: (params:GridCellParams) => 
        <Typography textTransform={"capitalize"}>{`${params.value}`}</Typography>},
        {field: 'id', headerName:"Acciones", flex: 1,minWidth: 150, renderCell: () =>(
            <Box display={"flex"} gap={2}>
                <EditCategoryButton/>
                <DeleteCategoryButton/>
            </Box>
        )}
    ];


    return (

            <DataGrid
                sx={{width:{sm:"70%"}, boxShadow: '20'}}
                columns={columns}
                rows={categories}
                getRowId={(row) => row._id}
                slots={{
                    toolbar: GridToolbar,
                    loadingOverlay: LinearProgress,
                }}
                
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                localeText={spanishText}
                slotProps={{
                    row: {
                        onMouseEnter: handleSelectCategory,
                        onMouseLeave: handleClearCategorySelected,
                    }
                }}
                density='comfortable'
            />
    )
}

const spanishText = {
    // Texto de la barra de herramientas
    toolbarExport: 'Exportar',
    toolbarExportCSV: 'Exportar a CSV',
    toolbarExportExcel: 'Exportar a Excel',
    toolbarFilters: "Filtrar",
    toolbarDensity: 'Densidad',
    toolbarColumns: 'Columnas',
    toolbarColumnsLabel: "Encontrar columna",
    
    // Texto de paginación
    footerTotalRows: 'Filas por pagina',
    // paginationRowsPerPage: 'Filas por página:',
    // paginationLabelRowsPerPage: 'Filas por página',
    // paginationLabelDisplayedRows: '{from}-{to} de {count}',
    // paginationFirstAriaLabel: 'Primera página',
    // paginationFirstTooltip: 'Primera página',
    // paginationPreviousAriaLabel: 'Página anterior',
    // paginationPreviousTooltip: 'Página anterior',
    // paginationNextAriaLabel: 'Siguiente página',
    // paginationNextTooltip: 'Siguiente página',
    // paginationLastAriaLabel: 'Última página',
    // paginationLastTooltip: 'Última página',
    // Otros textos
    noRowsLabel: 'No hay filas para mostrar',
    // ... Agrega más traducciones según sea necesario
};