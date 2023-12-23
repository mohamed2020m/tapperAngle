package com.reactlibrary

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.opencv.android.Utils
import org.opencv.core.Core
import org.opencv.core.CvType.CV_8UC4
import org.opencv.core.Mat
import org.opencv.core.MatOfPoint
import org.opencv.core.Scalar
import org.opencv.core.Size
import org.opencv.imgproc.Imgproc
import java.io.ByteArrayOutputStream

class RNOpenCvLibraryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "RNOpenCvLibrary"
    }

    @ReactMethod
    fun hello(name: String, callback: Callback) {
        val greeting = "Hello, $name"
        Log.d("hi", greeting)

        callback.invoke(null, greeting)
    }

    @ReactMethod
    fun loadImageAndProcess(base64Image: String, promise: Promise) {
        try {
            // Convert base64 image to Mat
            var imgMat = base64ToMat(base64Image)

            // Resize the image if dimensions exceed 1000x1000 pixels
            if (imgMat.width() > 1000 || imgMat.height() > 1000) {
                val scaleFactor = Math.min(1000.0 / imgMat.width(), 1000.0 / imgMat.height())

                // Calculate the new dimensions while maintaining the aspect ratio
                val newWidth = (imgMat.width() * scaleFactor).toInt()
                val newHeight = (imgMat.height() * scaleFactor).toInt()

                // Create a temporary Mat to store the resized image
                val tempMat = Mat(Size(newWidth.toDouble(), newHeight.toDouble()), CV_8UC4)
                Imgproc.resize(imgMat, tempMat, tempMat.size())

                // Update the original Mat with the resized image
                imgMat.release() // Release the original Mat
                imgMat = tempMat.clone()
                tempMat.release() // Release the temporary Mat
            }

            // Rest of the processing remains unchanged...
            val edges = Mat()
            val lines = Mat()

            // Convert the image to grayscale
            val gray = Mat()
            Imgproc.cvtColor(imgMat, gray, Imgproc.COLOR_RGBA2GRAY)

            // Apply Gaussian blur
            val blurred = Mat()
            Imgproc.GaussianBlur(imgMat, blurred, Size(0.0, 0.0), 2.0)
            Core.addWeighted(imgMat, 1.5, blurred, -0.5, 0.0, imgMat)

            // Apply Canny edge detection
            Imgproc.Canny(blurred, edges, 50.0, 150.0)

            // Dilate the image to connect components
            val dilated = Mat()
            val dilateSize = 1
            val dilateKernel = Imgproc.getStructuringElement(Imgproc.MORPH_CROSS, Size(dilateSize.toDouble(), dilateSize.toDouble()))
            Imgproc.dilate(edges, dilated, dilateKernel)

            // Use Hough transform to detect lines
            Imgproc.HoughLines(dilated, lines, 1.0, Math.PI / 180, 100)

            // Highlight the corners on the pre-processed image
            highlightCorners(imgMat, dilated)

            // Clean up
            gray.release()
            blurred.release()
            edges.release()
            dilated.release()
            dilateKernel.release()
            lines.release()

            // Convert the processed Mat to base64
            val processedBase64 = matToBase64(imgMat)

            imgMat?.release()

            // Return the result to React Native
            promise.resolve(processedBase64)
        } catch (e: Exception) {
            promise.reject("PROCESSING_ERROR", e.message)
        }
    }

//    private fun base64ToMat(base64Image: String): Mat {
//        try {
//            val decodedBytes = Base64.decode(base64Image, Base64.DEFAULT)
//
//            // Log the decoded byte array for inspection
//            Log.d("Base64ToMat", "Decoded Bytes: ${decodedBytes.contentToString()}")
//
//            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
//
//            if (bitmap == null) {
//                Log.e("Base64ToMat", "Error: Bitmap is null after decoding base64 image.")
//                throw RuntimeException("Bitmap is null after decoding base64 image.")
//            }
//
//            val mat = Mat()
//            Utils.bitmapToMat(bitmap, mat)
//            return mat
//        } catch (e: Exception) {
//            Log.e("Base64ToMat", "Error converting base64 to Mat: ${e.message}")
//            throw e
//        }
//    }


    private fun base64ToMat(base64Image: String): Mat {
        try {
            val decodedBytes = Base64.decode(base64Image, Base64.DEFAULT)
            Log.d("Base64ToMatError", "decodedBytes: ${decodedBytes.contentToString()}")
            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
//            Log.e("bitmap", "bitmap: ${bitmap.toString()}")
            val mat = Mat()
            Utils.bitmapToMat(bitmap, mat)
            return mat
        } catch (e: Exception) {
            // Log or throw an error
            Log.e("Base64ToMatError", "Error decoding base64 image: ${e.message}")
            throw e
        }
    }

    private fun matToBase64(mat: Mat): String {
        val bitmap = Bitmap.createBitmap(mat.cols(), mat.rows(), Bitmap.Config.ARGB_8888)
        Utils.matToBitmap(mat, bitmap)
        val outputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream)
        val byteArray = outputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.DEFAULT)
    }

    private fun highlightCorners(originalImage: Mat, dilated: Mat) {
        // Your corner highlighting logic here...
        // This is just a placeholder. You may implement corner highlighting based on your requirements.
        val contours = ArrayList<MatOfPoint>()
        val hierarchy = Mat()
        Imgproc.findContours(dilated, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE)

        for (contour in contours) {
            // Draw contours or perform other corner highlighting logic as needed
            Imgproc.drawContours(originalImage, contours, -1, Scalar(0.0, 255.0, 0.0), 2)
        }
    }
}
